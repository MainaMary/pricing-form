import React, { Children } from "react";
interface Props {
  children: string;
}
const Button = ({ children }: Props) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
