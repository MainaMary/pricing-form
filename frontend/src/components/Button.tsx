import React from "react";
interface Props {
  children: string | JSX.Element;
  onClick?: (x: any) => void;
  className?: string;
  disabled?: boolean;
}
const Button = ({ children, onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-center bg-gray-700 hover:bg-blue-700 text-white  py-2 px-4 cursor-pointer rounded focus:outline-none focus:shadow-outline"
      type="submit"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
