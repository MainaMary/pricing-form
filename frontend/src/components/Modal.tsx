import React, { useState } from "react";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import { FormType } from "../types";
import axios from "axios";
interface Props {
  openModal: boolean;
  handleModal: () => void;

  itemInfo: any;
}
const Modal = ({ openModal, handleModal, itemInfo }: Props) => {
  if (!openModal) return null;

  const [itemDetails, setItemDetails] = useState(itemInfo);
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setItemDetails({ ...itemDetails, [name]: value });
    console.log("hello World");
  };
  console.log(itemDetails, "itemDetails");
  const handleUpdate = async () => {
    const res = await axios.put(
      `http://localhost:5000/productsVarieties/${itemInfo._id}`,
      {
        name: "Coffee",
        index: 3,
        taxation: 2,
        discount: 4,
        subsidy: 20,
        total: 5080,
        date: "2022-10-23T12:44:35.383Z",
      }
    );
    console.log(res);
  };
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      }}
      // onClick={handleModal}
    >
      <form
        style={{
          boxShadow: "0 0 3px #777",
          backgroundColor: "#fff",
          width: "500px",
          padding: "8px 12px",
        }}
        onSubmit={handleUpdate}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="my-3">
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="eg Mac coffee"
            value={itemDetails?.name}
          />
        </div>
        <div className="my-3">
          <Label>Index</Label>
          <Input
            type="number"
            name="index"
            onChange={handleChange}
            placeholder="eg 2"
            value={itemDetails?.index}
          />
        </div>
        <div className="my-3">
          <Label>Taxation rate</Label>
          <Input
            type="number"
            name="taxation"
            onChange={handleChange}
            placeholder="eg 10%"
            value={itemDetails?.taxation}
          />
        </div>
        <div className="my-3">
          <Label>Discount</Label>
          <Input
            type="number"
            name="discount"
            onChange={handleChange}
            placeholder="eg 5%"
            value={itemDetails?.discount}
          />
        </div>
        <div className="my-3">
          <Label>Subsidy</Label>
          <Input
            type="number"
            name="subsidy"
            onChange={handleChange}
            placeholder="eg 8%"
            value={itemDetails?.subsidy}
          />
        </div>
        <div className="mt-3 flex w-full justify-between">
          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
