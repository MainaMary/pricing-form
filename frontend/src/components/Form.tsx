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
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import { hasValue } from "../tools";

const Form = () => {
  const id = useId();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [locationErr, setLocationErr] = useState("");
  const [indexErr, setIndexErr] = useState("");
  const [taxErr, setTaxErr] = useState("");
  const [discountErr, setDisocuntErr] = useState("");
  const [subsidyErr, setSubsidyErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const arr = useSelector((state: RootState) => state.createVariety);
  const [formValues, setFormValues] = useState<FormType>({
    name: "",
    index: 0,
    taxation: 0,
    discount: 0,
    subsidy: 0,
    date: "",
    productId: "",
    total: 0,
  });
  const [locations, setLocations] = useState([]);
  const [selectVal, setSelectVal] = useState("");
  const [saveChanges, setSaveChanges] = useState<boolean>(false);
  const { name, index, taxation, discount, subsidy } = formValues;
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
    if (obj?.price || index || taxation || subsidy || discount) {
      indexTotal = obj?.price && obj?.price * index;

      taxTotal = obj.price && (obj.price * taxation) / 100;
      discountTotal = discount && obj?.price && (obj.price * discount) / 100;
      subsidyTotal = subsidy && obj?.price && (obj.price * subsidy) / 100;
    }

    totalAmount = indexTotal + taxTotal - discountTotal - subsidyTotal;
    const data = {
      index: indexTotal,
      taxation: taxTotal,
      discount: discountTotal,
      subsidy: subsidyTotal,
      total: totalAmount,
    };

    return data;
  };

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
    console.log(value, "value");
    if (value[0] === "-") {
      return;
    }

    setFormValues({
      ...formValues,
      [name]: value,

      productId: id,
    });
    if (name) {
      setNameErr("");
    }
    if (index) {
      setIndexErr("");
    }
    if (discount) {
      setDisocuntErr("");
    }
    if (subsidy) {
      setSubsidyErr("");
    }
    if (taxation) {
      setTaxErr("");
    }
  };
  const handleValidation = (e: any) => {
    const errorExists = {
      name: false,
      tax: false,
      discount: false,
      subsidy: false,
      index: false,
      loc: false,
    };
    if (!name) {
      errorExists.name = true;
      setNameErr("Name is required");
    }
    if (!index) {
      errorExists.index = true;
      setIndexErr("Index is required");
    }
    if (!taxation) {
      errorExists.tax = true;
      setTaxErr("Tax is required");
    }
    if (!discount) {
      errorExists.discount = true;
      setDisocuntErr("Discount is required");
    }
    if (!subsidy) {
      errorExists.subsidy = true;
      setSubsidyErr("Subsidy is required");
    }
    if (!selectVal) {
      errorExists.loc = true;
      setLocationErr("Choose location");
    }
    const hasError = hasValue(errorExists);

    if (hasError) {
      return;
    }
    setSaveChanges(true);
  };

  const handleSubmit = (e: React.SyntheticEvent, id: string) => {
    e.preventDefault();
    handleValidation(e);
    const cloneObj = handleTotal(
      indexTotal,
      taxTotal,
      discountTotal,
      subsidyTotal
    );

    dispatch(
      addVarieties({
        ...cloneObj,
        date: new Date(),
        productId: id,
        name: formValues.name,
      })
    );

    if (arr.status === "success") {
      setSaveChanges(false);
      setTimeout(() => {
        navigate(`/singleVariety/${arr.items._id}`);
      }, 300);
    }

    // setFormValues({
    //   name: "",
    //   index: 0,
    //   tax: 0,
    //   discount: 0,
    //   subsidy: 0,
    //   date: new Date(),
    //   productId: "",
    //   total: 0,
    // });
  };
  const handleChanges = () => {
    return (
      <div className="flex space-between w-auto">
        {arr.status === "loading" ? (
          <div className="mx-1 my-0">
            <p>Loading..</p>
          </div>
        ) : (
          <> Save changes</>
        )}
      </div>
    );
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "https://pricing-form.herokuapp.com/locations"
      );
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
                setLocationErr("");
              }}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" selected disabled>
                Select location
              </option>
              {locations?.map((location: any) => (
                <option key={location.id} value={location.id}>
                  {location.site}
                </option>
              ))}
            </select>
            <Error>{locationErr ? locationErr : ""}</Error>
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
              value={name.trim()}
            />
            <Error>{nameErr ? nameErr : ""}</Error>
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
            <Error>{indexErr ? indexErr : ""}</Error>
          </div>
          <div className="my-3">
            <Label>Taxation rate</Label>
            <Input
              type="number"
              name="taxation"
              onChange={handleChange}
              placeholder="eg 10%"
              value={taxation}
            />
            <Error>{taxErr ? taxErr : ""}</Error>
          </div>
          <div className="my-3">
            <Label>Discount</Label>
            <Input
              type="number"
              name="discount"
              onChange={handleChange}
              placeholder="eg 5%"
              value={discount}
            />
            <Error>{discountErr ? discountErr : ""}</Error>
          </div>
          <div className="my-3">
            <Label>Subsidy</Label>
            <Input
              type="number"
              name="subsidy"
              onChange={handleChange}
              placeholder="eg 8%"
              value={subsidy}
            />
            <Error>{subsidyErr ? subsidyErr : ""}</Error>
          </div>
          <div className="mt-3 flex w-full justify-between">
            <Button>{handleChanges()}</Button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default Form;
