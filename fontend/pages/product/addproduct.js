import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "../api/customAxiosConfig/CustomAxiosConfig";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    description: "",
    category: "",
    productName: "",
    price: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevState) => ({
        ...prevState,
        image: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("image", formData.image);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("price", formData.price);

      const response = await axios.post(
        `/api/product/addProduct`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product Added successful:", response.data);
      router.push("/tshirts");
    } catch (error) {
      console.error("Error adding product:", error);
      router.push("/login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-gray-100 shadow-md rounded-md bg-white text-gray-800"
    >
      <h2 className="text-2xl mb-4 font-semibold text-gray-800">
        Add New Product
      </h2>
      <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image
        </label>
        <div className="mt-1 flex items-center">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
          >
            <span>Choose a file</span>
            <input
              id="file-upload"
              name="image"
              type="file"
              onChange={handleChange}
              className="sr-only"
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-white text-gray-800"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select a category</option>
          <option value="Tshirts">Tshirts</option>
          <option value="Hoodies">Hoodies</option>
          <option value="Jeans">Jeans</option>
          <option value="Shoes">Shoes</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-white text-gray-800 py-2 px-3" // Added Tailwind CSS classes for styling
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-white text-gray-800 py-2 px-3" // Added Tailwind CSS classes for styling
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
