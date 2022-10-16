import React from "react";
interface Props {
  children: string;
}
const Error = ({ children }: Props) => {
  return <div className="text-red-600 my-1">{children}</div>;
};

export default Error;
