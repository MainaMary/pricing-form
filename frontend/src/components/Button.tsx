import React from "react";
interface Props {
  children: string;
  onClick?: (x: any) => void;
  className?: string;
}
const Button = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;
