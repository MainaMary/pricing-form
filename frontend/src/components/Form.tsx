import React, { useState, useEffect, useId } from "react";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";
import { addVariety } from "../features/AddVarietySlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Form = () => {
  const id = useId();
  const [formValues, setFormValues] = useState({
    name: "",
    index: null,
    tax: null,
    discount: null,
    subsidy: null,
    date: new Date(),
    productId: "",
  });
  const [locations, setLocations] = useState([]);
  const [selectVal, setSelectVal] = useState("");
  const { name, index, tax, discount, subsidy, date } = formValues;
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value, date: date, productId: id });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formValues);
    console.log("submit");
    setFormValues({
      name: "",
      index: null,
      tax: null,
      discount: null,
      subsidy: null,
      date: new Date(),
      productId: "",
    });
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/locations");
      setLocations(response.data);
    } catch (err: any) {
      console.log(err.messaage);
    }
  };
  useEffect(() => {
    fetchLocations();
  }, []);
  return (
    <div className=" bg-white shadow-lg m-auto flex mt-16 items-center justify-center max-w-3xl   rounded-md">
      <form onSubmit={handleSubmit} className="w-full px-6 py-9">
        <h2 className="mb-4 text-gray-700 text-lg font-bold">Add charges</h2>
        <div className="mb-3">
          <Label>Location</Label>
          <select
            value={selectVal}
            onChange={(e: any) => {
              setSelectVal(e.target.value);
            }}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {locations?.map((location: any) => (
              <option key={location.id} value={location.id}>
                {location.site}
              </option>
            ))}
          </select>
        </div>
        <div className="my-3">
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="eg Mac coffee"
            value={name}
          />
        </div>
        <div className="my-3">
          <Label>Index</Label>
          <Input
            type="number"
            name="index"
            onChange={handleChange}
            placeholder="eg 2"
            value={index}
          />
        </div>
        <div className="my-3">
          <Label>Taxation rate</Label>
          <Input
            type="number"
            name="tax"
            onChange={handleChange}
            placeholder="eg 10%"
            value={tax}
          />
        </div>
        <div className="my-3">
          <Label>Discount</Label>
          <Input
            type="number"
            name="discount"
            onChange={handleChange}
            placeholder="eg 200"
            value={discount}
          />
        </div>
        <div className="my-3">
          <Label>Subsidy</Label>
          <Input
            type="number"
            name="subsidy"
            onChange={handleChange}
            placeholder="eg 100"
            value={subsidy}
          />
        </div>
        <div className="mt-3 flex w-full justify-between">
          <Button>Get total</Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
