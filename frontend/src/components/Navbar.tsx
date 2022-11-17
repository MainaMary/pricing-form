import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const varietiesArr = useSelector((state: RootState) => state.variety);
  const handleClick = () => {
    navigate("/products");
  };

  return (
    <nav className=" text-white px-7 h-16 items-center shadow-md bg-blue-500 w-full flex justify-between">
      <h2 className="text-xl font-bold">Price setter</h2>
      <div className="flex w-1/3 justify-between">
        <button
          onClick={handleClick}
          className="bg-white hover:text-blue-600 text-blue-600 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign in
        </button>
        <button
          onClick={handleClick}
          className="bg-white hover:text-blue-600 text-blue-600 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign up
        </button>
        <button
          onClick={handleClick}
          className="bg-white hover:text-blue-600 text-blue-600 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          View product list
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
