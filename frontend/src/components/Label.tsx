import React from "react";
interface Props {
  children: string;
}

const Label = ({ children }: Props) => {
  return (
    <label className="block mb-4 text-gray-700 text-sm font-bold">
      {children}
    </label>
  );
};

export default Label;
