import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const varietiesArr = useSelector((state: RootState) => state.variety);
  const handleClick = () => {
    navigate("/products");
  };

  return (
    <nav className=" md:text-white px-7 h-16 items-center shadow-md bg-white w-full flex justify-between">
      <h2
        className="text-gray-700 font-bold text-2xl"
        onClick={() => {
          navigate("/");
        }}
      >
        Price setter
      </h2>
      <div className="flex w-1/3 justify-between">
        <button
          onClick={handleClick}
          className="bg-gray-700 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign in
        </button>
        <button
          onClick={handleClick}
          className="bg-gray-700 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign up
        </button>
        <button
          onClick={handleClick}
          className="bg-gray-700 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          View product list
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
