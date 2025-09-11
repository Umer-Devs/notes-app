import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/login", form);
    console.log("  Login successful:", res.data);

    alert(res.data); // backend ka message show karega
  } catch (error) {
    console.error(" Login failed:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Something went wrong");
  }
};


  return (
    <section className="bg-gray-900 w-full min-h-screen p-4 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="uppercase font-bold text-2xl text-center text-white mb-8 italic underline">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md py-3 text-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Login
          </button>
          <div className='text-end'>
            <Link to={'/sign-up'} className='text-white font-semibold underline'>Signup</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;