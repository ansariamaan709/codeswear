package com.codeswear.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.codeswear.dao.CartItemRepository;
import com.codeswear.dao.CartRepository;
import com.codeswear.dao.ProductRepository;
import com.codeswear.dao.UserRepository;
import com.codeswear.entities.Cart;
import com.codeswear.entities.CartItem;
import com.codeswear.entities.Category;
import com.codeswear.entities.Product;
import com.codeswear.entities.User;
import com.codeswear.enums.CategoryEnums;
import com.codeswear.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductController {

	@Autowired
	ProductRepository productRepo;

	@Autowired
	UserRepository userRepo;

	@Autowired
	CartRepository cartRepo;

	@Autowired
	CartItemRepository cartItemRepo;

	@PostMapping("api/product/addProduct")
	public ResponseEntity<String> addProduct(@RequestParam("image") MultipartFile image,
			@RequestParam("description") String description, @RequestParam("category") String category,
			@RequestParam("productName") String productName, @RequestParam("price") Double price) {
		System.err.println(description);
		if (!image.isEmpty()) {
			try {
				// Save image to filesystem
				String uploadsDir = "C:\\Users\\HP\\Desktop\\NextJS\\codeswear\\public\\images\\Tshirts";
				String filename = image.getOriginalFilename();
				Path filePath = Paths.get(uploadsDir, filename);
				Files.write(filePath, image.getBytes());

				Product product = new Product();
				Category category1 = new Category();
				Long categoryType = null;
				if (category.equalsIgnoreCase("Tshirts")) {
				CategoryEnums categoryEnums= CategoryEnums.TSHIRTS;
				categoryType = (long) categoryEnums.getCode();
				}
				else if (category.equalsIgnoreCase("Hoodies")) {
					CategoryEnums categoryEnums= CategoryEnums.HOODIES;
					categoryType = (long) categoryEnums.getCode();
				}
				else {
					CategoryEnums categoryEnums= CategoryEnums.PANTS;
					categoryType = (long) categoryEnums.getCode();
				}
				
				category1.setCategoryType(categoryType);
				category1.setCategoryName(category);
				product.setCategory(category1);
				product.setImage(filename);
				product.setDescription(description);
				// product.setCategory(category);
				product.setProductName(productName);
				product.setPrice(price);

				// Save product to database
				this.productRepo.save(product);

				return ResponseEntity.ok("Product added successfully");
			} catch (IOException e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save image");
			}
		} else {
			return ResponseEntity.badRequest().body("Image file is required");
		}
	}

	@GetMapping("api/products/tshirts")
	@Operation(summary = "Get All T-shirts", security = @SecurityRequirement(name = "bearerAuth"))
	public ResponseEntity<?> getAllTshirts() {

		List<Product> products = this.productRepo.findByCategoryCategoryType((long) 1);
		List<ProductDTO> productDTO = new ArrayList<>();
		for (Product product : products) {
			ProductDTO newProductDTO = new ProductDTO(product.getProductId(), product.getProductName(),
					product.getImage(), product.getDescription(), product.getQuantity(), product.getPrice(), 0, 0);
			productDTO.add(newProductDTO);
		}

		return ResponseEntity.ok(productDTO);
	}
	
	@GetMapping("api/products/hoodies")
	@Operation(summary = "Get All Hoodies", security = @SecurityRequirement(name = "bearerAuth"))
	public ResponseEntity<?> getAllHoodies() {

		List<Product> products = this.productRepo.findByCategoryCategoryType((long) 2);
		List<ProductDTO> productDTO = new ArrayList<>();
		for (Product product : products) {
			ProductDTO newProductDTO = new ProductDTO(product.getProductId(), product.getProductName(),
					product.getImage(), product.getDescription(), product.getQuantity(), product.getPrice(), 0, 0);
			productDTO.add(newProductDTO);
		}

		return ResponseEntity.ok(productDTO);
	}

	@GetMapping("/product/tshirt/{Id}")
	public ResponseEntity<?> getTshirt(@PathVariable("Id") Integer pid, Principal principal) {

		Product product = this.productRepo.findByProductId((long) (pid));
		ProductDTO productDTO = new ProductDTO(product.getProductId(), product.getProductName(), product.getImage(),
				product.getDescription(), product.getQuantity(), product.getPrice(), 0, 0);
		return ResponseEntity.ok(productDTO);
	}

	@PostMapping("/api/addToCart")
	public ResponseEntity<?> addToCart(@RequestBody ProductDTO tshirt, Principal principal) {
		try {
			String email = principal.getName();
			User user = this.userRepo.findByEmail(email);
			if (user == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
			}

			Cart cart = this.cartRepo.findByUser(user);
			if (cart == null) {
				cart = new Cart();
				cart.setUser(user);
			}

			CartItem cartItemToUpdate = null;

			List<CartItem> cartItems = cart.getCartItems();

			for (CartItem cartItem : cartItems) {
				if (cartItem.getProduct().getProductId().equals(tshirt.getProductId())) {

					cartItemToUpdate = cartItem;

				}
			}

			if (cartItemToUpdate != null) {
				Product product = this.productRepo.findByProductId(cartItemToUpdate.getProduct().getProductId());
				cartItemToUpdate.setQuantity(cartItemToUpdate.getQuantity() + 1);
				cartItemToUpdate.setCart(cart);
				cartItemToUpdate.setProduct(product);

				try {
					this.cartItemRepo.save(cartItemToUpdate);

					return ResponseEntity.ok("Quantity updated in Cart");

				} catch (Exception e) {
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Quantity not updated");
				}
			}

			Product product = this.productRepo.findByProductId((long) tshirt.getProductId());
			if (product == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
			}

			CartItem cartItem = new CartItem();
			cartItem.setCart(cart);
			cartItem.setProduct(product);
			cartItem.setQuantity(1);
			cart.getCartItems().add(cartItem);

			this.cartRepo.save(cart);
			return ResponseEntity.ok("Added to Cart");
		} catch (Exception e) {
			e.printStackTrace(); // Log the exception for debugging purposes
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add to cart");
		}
	}

	@GetMapping("/api/user/cart")
	@Operation(summary = "Get User Cart", security = @SecurityRequirement(name = "bearerAuth"))
	public ResponseEntity<?> getUserCart(Principal principal) {
		User user = this.userRepo.findByEmail(principal.getName());
		Cart cart = user.getCart();
		List<CartItem> cartItems = cart.getCartItems();
		List<CartItemDTO> CartItems = new ArrayList<>();
		for (CartItem cartItem : cartItems) {
			CartItemDTO newCartItemDTO = new CartItemDTO(cartItem.getCartItemId(), cartItem.getProduct().getImage(),
					cartItem.getProduct().getProductName(), cartItem.getQuantity(), cartItem.getProduct().getPrice());
			CartItems.add(newCartItemDTO);
		}
		return ResponseEntity.ok(CartItems);

	}

	@DeleteMapping("/api/user/cart/{cartItemId}")
	public ResponseEntity<?> removeFromCart(@PathVariable("cartItemId") Long cartItemId, Principal principal) {
		User user = this.userRepo.findByEmail(principal.getName());
		Cart cart = user.getCart();
		List<CartItem> cartItems = cart.getCartItems();
		try {
			for (CartItem cartItem : cartItems) {
				if (cartItem.getCartItemId().equals(cartItemId)) {

					this.cartItemRepo.deleteByCartItemIdQuery(cartItemId);
				}
			}

			return ResponseEntity.ok("Item removed from cart successfully");
		} catch (Exception e) {
			e.printStackTrace(); // Log the exception for debugging purposes
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to remove from cart");
		}

	}

	@PostMapping("/api/cart/increase/{cartItemId}")
	public ResponseEntity<?> increaseQuantityInCart(@PathVariable("cartItemId") Long cartItemId, Principal principal) {
		String email = principal.getName();
		User user = this.userRepo.findByEmail(email);
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}

		Cart cart = this.cartRepo.findByUser(user);
		CartItem cartItemToUpdate = null;

		List<CartItem> cartItems = cart.getCartItems();
		for (CartItem cartItem : cartItems) {
			if (cartItem.getCartItemId().equals(cartItemId)) {
				cartItemToUpdate = cartItem;

			}
		}
		Product product = this.productRepo.findByProductId(cartItemToUpdate.getProduct().getProductId());
		cartItemToUpdate.setQuantity(cartItemToUpdate.getQuantity() + 1);
		cartItemToUpdate.setCart(cart);
		cartItemToUpdate.setProduct(product);

		try {
			this.cartItemRepo.save(cartItemToUpdate);

			return ResponseEntity.ok("Quantity updated in Cart");

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Quantity not updated");
		}
	}

	@PostMapping("/api/cart/decrease/{cartItemId}")
	public ResponseEntity<?> decreaseQuantityInCart(@PathVariable("cartItemId") Long cartItemId, Principal principal) {
		String email = principal.getName();
		User user = this.userRepo.findByEmail(email);
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}

		Cart cart = this.cartRepo.findByUser(user);
		CartItem cartItemToUpdate = null;
		List<CartItem> cartItems = cart.getCartItems();
		for (CartItem cartItem : cartItems) {
			if (cartItem.getCartItemId().equals(cartItemId)) {
				cartItemToUpdate = cartItem;

			}
		}
		Product product = this.productRepo.findByProductId(cartItemToUpdate.getProduct().getProductId());
		cartItemToUpdate.setQuantity(cartItemToUpdate.getQuantity() - 1);
		cartItemToUpdate.setCart(cart);
		cartItemToUpdate.setProduct(product);

		try {
			this.cartItemRepo.save(cartItemToUpdate);

			return ResponseEntity.ok("Quantity updated in Cart");

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Quantity not updated");
		}
	}
	
	 @DeleteMapping("/api/product/delete/{productId}")
	    public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
	        // Check if the product exists
	        if (!productRepo.existsById(productId)) {
	        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Product Not found");
	        }
	       
	        if (cartItemRepo.existsByProductProductId(productId)) {
	        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Product Cannot be Deleted");
	        }
	        try {
	       
	            productRepo.deleteById(productId);
	            return ResponseEntity.ok("Product deleted successfully");
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete product");
	        }
	    }
	}


