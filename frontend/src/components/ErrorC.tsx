import React from "react";

interface Props {
  title: string;
  subtitle: string;
  text: string;
  image?: string;
}
const ErrorC = ({ title, subtitle, text, image }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <h4>{subtitle}</h4>
      <p>{text}</p>
    </div>
  );
};

export default ErrorC;
