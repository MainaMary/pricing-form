import React, { useState } from "react";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";

const Form = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    index: null,
    tax: null,
    discount: null,
    subsidy: null,
  });
  const handleChange = (e: any) => {
    const { name, target } = e.value;
    setFormValues({ ...formValues, [name]: target });
  };
  return (
    <div className=" m-auto flex mt-16 items-center justify-center max-w-4xl   rounded-md">
      <form className="w-full bg-white shadow-lg px-9 py-9">
        <div className="mb-3">
          <Label>Location</Label>
          <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></select>
        </div>
        <div className="my-3">
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="eg Mac coffee"
          />
        </div>
        <div className="my-3">
          <Label>Index</Label>
          <Input
            type="number"
            name="index"
            onChange={handleChange}
            placeholder="eg 2"
          />
        </div>
        <div className="my-3">
          <Label>Taxation rate</Label>
          <Input
            type="number"
            name="tax"
            onChange={handleChange}
            placeholder="eg 10%"
          />
        </div>
        <div className="my-3">
          <Label>Discount</Label>
          <Input
            type="number"
            name="discount"
            onChange={handleChange}
            placeholder="eg 200"
          />
        </div>
        <div className="my-3">
          <Label>Subsidy</Label>
          <Input
            type="number"
            name="subsidy"
            onChange={handleChange}
            placeholder="eg 100"
          />
        </div>
        <div className="mt-3 flex w-full justify-between">
          <Button>Get total</Button>
          <Button>View product list</Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
