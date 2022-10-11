import React from "react";
interface Props {
  type: string;
  onChange: (x: any) => void;
  name: string;
  placeholder: string;
}

const Input = (props: Props) => {
  const { type, onChange, name, placeholder } = props;
  return (
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type={type}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
