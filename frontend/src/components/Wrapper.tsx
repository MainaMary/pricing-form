import React from "react";
import { Children } from "react";
interface Props {
  children: JSX.Element;
}
const Wrapper = ({ children }: Props) => {
  return (
    <div className="bg-white flex shadow-lg m-auto items-center justify-center max-w-3xl rounded-md">
      {children}
    </div>
  );
};

export default Wrapper;
