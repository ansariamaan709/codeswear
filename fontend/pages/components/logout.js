import React, { useEffect } from "react";
import AuthenticationService from "../api/authentication/AuthenticationService";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    AuthenticationService.logout();
    router.push("/components/login"); // Redirect to the login page after logout
  }, [router]);

  return null; // Return null or an empty element since there's no UI to render
};

export default Logout;
