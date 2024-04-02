import { useRouter } from "next/router";
import React, { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const adminProtectedRoutes = ["/product/addproduct"];
  const router = useRouter();
  const { pathname } = router; // Use `pathname` instead of `query`

  useEffect(() => {
    const checkUserRole = async () => {
      if (adminProtectedRoutes.includes(pathname)) {
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("token");
        if (role === "user" && token !== null) {
          const timeoutId = setTimeout(() => {
            // Use client-side routing to navigate without a server request
            router.replace("/components/accessDenied");
          }); // Adjust the delay as needed
          return () => clearTimeout(timeoutId);
        } else if (role !== "user" && token === null) {
          router.replace("/components/login");
        }
      }
    };

    checkUserRole().catch((error) => {
      console.error("Error checking user role:", error);
    });

    // No need to return anything from the useEffect cleanup function
  }, [pathname]); // Include router in the dependency array if needed

  return <div>{children}</div>;
}

export default ProtectedRoutes;
