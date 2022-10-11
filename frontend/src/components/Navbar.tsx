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
    <nav className=" text-white px-7 h-16 items-center shadow-md bg-blue-500 w-full fixed top-0 left-0 flex justify-between">
      <h2 className="text-xl">Price form</h2>
      <div className="text-xl">
        <button
          onClick={handleClick}
          className="bg-white hover:text-blue-600 text-blue-600 font-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          View product list
        </button>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          width="20px"
          height="20px"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          />
        </svg> */}
      </div>
    </nav>
  );
};

export default Navbar;
