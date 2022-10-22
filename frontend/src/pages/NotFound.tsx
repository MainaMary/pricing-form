import React from "react";
import ErrorC from "../components/ErrorC";

const NotFound = () => {
  const text = `It looks like you have reached a URL that does not exist. Please use the button below to
  find your way back to 
  your dashboard.`;
  return (
    <div>
      <ErrorC
        title="404"
        subtitle="The page you are looking for does not exist"
        text={text}
      />
    </div>
  );
};

export default NotFound;
