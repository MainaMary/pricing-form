import React, { useState, useEffect, useId } from "react";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import { addVarieties } from "../features/CreateVarietySlice";
import { useDispatch } from "react-redux";
import { FormType, LocationType } from "../types";
import { AppDispatch } from "../store";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Wrapper from "./Wrapper";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const id = useId();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const arr = useSelector((state: RootState) => state.createVariety);
  const [formValues, setFormValues] = useState<FormType>({
    name: "",
    index: 0,
    tax: 0,
    discount: 0,
    subsidy: 0,
    date: "",
    productId: "",
    total: 0,
  });
  const [locations, setLocations] = useState([]);
  const [selectVal, setSelectVal] = useState("");
  const { name, index, tax, discount, subsidy, date, total } = formValues;
  let obj: LocationType = {};
  let taxTotal: any,
    subsidyTotal: any,
    discountTotal: any,
    indexTotal: any,
    totalAmount: any;

  const handleTotal = (
    indexTotal: any,
    taxTotal: any,
    discountTotal: any,
    subsidyTotal: any
  ) => {
    if (obj?.price || index || tax || subsidy || discount) {
      indexTotal = obj?.price && obj?.price * index;

      taxTotal = obj.price && (obj.price * tax) / 100;
      discountTotal = discount && obj?.price && (obj.price * discount) / 100;
      subsidyTotal = subsidy && obj?.price && (obj.price * subsidy) / 100;
    }

    totalAmount = indexTotal + taxTotal - discountTotal - subsidyTotal;
    const data = {
      index: indexTotal,
      tax: taxTotal,
      discount: discountTotal,
      subsidy: subsidyTotal,
      total: totalAmount,
    };

    return data;
  };
  console.log(arr, "array");
  const handleCost = () => {
    locations.map((item: any) => {
      if (selectVal == item.id.toString()) {
        obj = Object.assign({}, item);
      }
    });
  };
  handleCost();
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,

      productId: id,
    });
  };

  const handleSubmit = (e: any, id: string) => {
    e.preventDefault();
    const cloneObj = handleTotal(
      indexTotal,
      taxTotal,
      discountTotal,
      subsidyTotal
    );
    console.log({ ...cloneObj });
    dispatch(
      addVarieties({
        ...cloneObj,
        date: new Date(),
        productId: id,
        name: formValues.name,
      })
    );
    if (arr.status === "success") {
      return navigate(`/singleVariety/${id}`);
    }

    setFormValues({
      name: "",
      index: 0,
      tax: 0,
      discount: 0,
      subsidy: 0,
      date: new Date(),
      productId: "",
      total: 0,
    });
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/locations");
      setLocations(response.data);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <>
      <Wrapper>
        <form
          onSubmit={(e: any) => handleSubmit(e, arr.items._id)}
          className="w-full px-6 py-9"
        >
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
            {obj.price ? (
              <h2 className="my-2">Product Base price : {obj?.price}</h2>
            ) : (
              ""
            )}
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
      </Wrapper>
    </>
  );
};

export default Form;
