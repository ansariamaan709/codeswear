// components/LoginForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import AuthenticationService from "../api/authentication/AuthenticationService";
import LoginService from "../api/login/LoginService";
import AuthenticateUserDataService from "../api/authentication/AuthenticateUserDataService";

const LoginForm = () => {
  useEffect(() => {
    AuthenticationService.logout();
  }, []);

  const [credentials, setcredentials] = useState({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [loginState, setLoginState] = useState({
    hasLoginFailed: false,
    showSuccessMessage: false,
  });
  const router = useRouter();
  const validate = () => {
    const errors = {};

    if (!credentials.userName) {
      errors.userName = "Username required";
    } else if (credentials.userName.length < 4) {
      errors.userName = "Minimum 4 characters";
    }

    if (!credentials.password) {
      errors.password = "A password is required";
    }

    return errors;
  };

  const loginClicked = async (event) => {
    event.preventDefault();
    const res = await AuthenticateUserDataService(
      credentials.userName,
      credentials.password
    );
    console.log(res.data);

    if (res.status !== 200) {
      setLoading(false);
      setLoginState((prevState) => ({ ...prevState, hasLoginFailed: true }));
      setLoginState((prevState) => ({
        ...prevState,
        showSuccessMessage: false,
      }));
    } else {
      let jwtToken = res.data.jwtToken;
      const token = `Bearer ${jwtToken}`;
      AuthenticationService.setUpToken(token);
      console.log(credentials.userName);
      const response = await LoginService(credentials.userName, jwtToken);
      console.log(response);
      if (response.status !== 200) {
        setLoading(false);
        setLoginState((prevState) => ({
          ...prevState,
          hasLoginFailed: true,
        }));
        setLoginState((prevState) => ({
          ...prevState,
          showSuccessMessage: false,
        }));
      } else if (response.data === "USER") {
        AuthenticationService.registerSuccessfulLoginUser(credentials.userName);
        router.push("/tshirts");
      } else if (response.data === "ADMIN") {
        AuthenticationService.registerSuccessfulLoginBusiness(
          credentials.userName
        );
        router.push("/tshirts");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={loginClicked}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="mb-4">
        <input
          type="text"
          name="userName"
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Username"
          value={credentials.userName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          name="password"
          className="w-full px-3 py-2 border rounded-lg bg-white text-gray-800"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
