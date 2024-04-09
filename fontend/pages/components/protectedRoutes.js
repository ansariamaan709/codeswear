import { useRouter } from "next/router";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const adminProtectedRoutes = ["/product/addproduct"];
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      const pathname = router.pathname;
      if (adminProtectedRoutes.includes(pathname)) {
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("token");

        if (role === "user" && token !== null) {
          router.replace("/components/accessDenied");
        } else if (role !== "user" && token === null) {
          router.replace("/components/login");
        }
      }
    };

    checkUserRole().catch((error) => {
      console.error("Error checking user role:", error);
    });
  }, [router.pathname]);

  return <div>{children}</div>;
}

export default ProtectedRoutes;
