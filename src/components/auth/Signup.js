import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

const Signup = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    password: "",
    cpassword: "",
    adminKey: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const PostData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const {
      name,
      email,
      phone,
      userType,
      adminKey,
      password,
      cpassword,
    } = user;

    try {
      await axios.post(
        // "http://localhost:9002/register",
        `${process.env.REACT_APP_SERVER_URL}/register`,
        {
          name,
          email,
          phone,
          userType,
          adminKey,
          password,
          cpassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);
      toast.success("Sign Up Successfull!");

      navigate("/login");
    } catch (error) {
      if (error.response.status === 422 && error.response) {
        setIsLoading(false);
        const data = error.response.data;
        setAuthStatus(data.error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section className="flex items-center justify-center min-h-screen my-10 text-gray-600 bg-white body-font">
          <div className="flex flex-col p-8 my-10 mt-10 bg-white rounded-lg shadow-2xl lg:w-2/6 md:w-1/2 shadow-blue-200 md:ml-auto md:mr-auto md:mt-0">
            <form method="POST">
              <h3 className="my-8 text-3xl font-extrabold leading-normal tracking-tight text-gray-900 sm:text-4xl">
                Sign <span className="text-indigo-600">Up</span>
              </h3>
              <div className="relative mb-4">
                <label
                  htmlFor="full-name"
                  className="block text-xs font-bold leading-7 tracking-wide text-gray-700 uppercase"
                >
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={user.name}
                  onChange={handleInputs}
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold leading-7 tracking-wide text-gray-700 uppercase"
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={user.email}
                  onChange={handleInputs}
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold leading-7 tracking-wide text-gray-700 uppercase"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                  value={user.phone}
                  onChange={handleInputs}
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="userType"
                  className="block text-xs font-bold leading-7 tracking-wide text-gray-700 uppercase"
                >
                  Your Role
                </label>

                <select
                  className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  id="userType"
                  name="userType"
                  value={user.userType}
                  onChange={handleInputs}
                >
                  <option value="">Select</option>

                  <option value="user">user</option>
                  {process.env.REACT_APP_HOD_FEATURE === "true" && (
                    <option value="hod">HOD</option>
                  )}

                  {process.env.REACT_APP_ADMIN_SIGN_UP === "true" && (
                    <option value="admin">admin</option>
                  )}
                </select>
              </div>

              {user.userType === "admin" ? (
                <>
                  <div className="relative mb-4">
                    <label
                      htmlFor="adminKey"
                      className="block text-xs font-bold leading-7 tracking-wide text-gray-700 uppercase"
                    >
                      Admin Key
                    </label>
                    <input
                      type="text"
                      required
                      value={user.adminKey}
                      onChange={handleInputs}
                      id="adminKey"
                      name="adminKey"
                      placeholder="Admin Key"
                      className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                </>
              ) : (
                <>
                </>
              )}

              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold leading-7 tracking-wide text-gray-700 uppercase"
                >
                  Password
                </label>
                <input
                  required
                  value={user.password}
                  onChange={handleInputs}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="cpassword"
                  className="block text-xs font-bold leading-7 tracking-wide text-gray-700 uppercase"
                >
                  Confirm Password
                </label>
                <input
                  required
                  value={user.cpassword}
                  onChange={handleInputs}
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  placeholder="Confirm Password"
                  className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="my-4">
                <p className="font-bold text-red-600 text-s">{authStatus}</p>
              </div>
              <div className="mx-auto w-fit">
                <div className="mx-auto">
                  <button
                    type="submit"
                    onClick={PostData}
                    className="px-10 py-2 text-lg font-bold text-white bg-indigo-600 border-0 rounded shadow focus:shadow-outline focus:outline-none hover:bg-indigo-800"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-m">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    {" "}
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Signup;
