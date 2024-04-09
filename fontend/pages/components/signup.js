import React, { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/signup",
        formData
      );
      console.log("Signup successful:", response.data);
      // Redirect to homepage
      //router.push('/');
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="mb-4">
        <input
          type="text"
          name="name"
          className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          name="password"
          className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
