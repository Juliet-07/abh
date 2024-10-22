import React, { useState } from "react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Login = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const initialValues = {
    email: "",
    password: "",
  };

  const [loginDetails, setLoginDetails] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { email, password } = loginDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const onSubmit = async () => {
    setLoading(true);
    setErrorMessage(null); // Reset any previous error message
    const url = `${apiURL}/admin/login`;
    try {
      const response = await axios.post(url, loginDetails);
      console.log(response, "response");
      let accessToken = response.data.data.accessToken;
      localStorage.setItem("adminToken", accessToken);
      navigate("/dashboard"); // Navigate to dashboard on successful login
    } catch (error) {
      console.error("Error in API call:", error);
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full mx-4 md:w-[400px] border rounded-lg shadow-xl bg-white p-10 flex flex-col items-center justify-center gap-10">
        <div>
          <Logo className="w-[150px] mb-3" />
          <i className="text-gray-700 font-primaryRegular text-center">
            login to dashboard
          </i>
        </div>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-primarySemibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border border-green-500 rounded w-full p-3 text-gray-700 leading-tight focus:outline-none"
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-sm font-primarySemibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border border-green-500 rounded w-full p-3 text-gray-700 mb-3 leading-tight focus:outline-none"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute top-4 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
            </button>
          </div>
          <button
            className="w-full bg-green-500 text-white font-primarySemibold p-3 rounded flex items-center justify-center"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>
          {errorMessage && (
            <div className="bg-red-500 text-white text-sm font-primaryMedium p-4 mt-4 text-center">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
