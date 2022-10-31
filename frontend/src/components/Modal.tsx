import React, { useState, useEffect } from "react";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import { FormType, SnackbarProps } from "../types";
import CustomAlert from "./CustomAlert";
import axios from "axios";
interface Props {
  openModal: boolean;
  handleModal: () => void;

  itemInfo: any;
}
const Modal = ({ openModal, handleModal, itemInfo }: Props) => {
  if (!openModal) return null;

  const [itemDetails, setItemDetails] = useState(itemInfo);
  const [name, setName] = useState("");
  const [index, setIndex] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [tax, setTax] = useState(null);
  const [subsidy, setSubsidy] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarProps>({
    title: "",
    content: "",
    severity: "",
  });
  const [openSnack, setOpenSnack] = useState(false);
  const handleAlert = (snackbar: SnackbarProps) => {
    const { title, content, severity } = snackbar;
    return (
      <CustomAlert
        title={title}
        content={content}
        severity={severity}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    );
  };
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setItemDetails({ ...itemDetails, [name]: value });
  };
  console.log(itemDetails, "itemDetails");
  useEffect(() => {
    if (itemInfo) {
      setName(itemInfo.name);
      setTax(itemInfo.taxation);
      setSubsidy(itemInfo.subsidy);
      setDiscount(itemInfo.discount);
      setIndex(itemInfo.index);
    }
  }, []);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      name: name,
      index: index,
      taxation: tax,
      discount,
      subsidy,
      total: 4000,
      date: Date.now(),
    };
    axios
      .put(`http://localhost:5000/productsVarieties/${itemInfo._id}`, payload)
      .then((res) => {
        if (res.statusText === "OK") {
          setSnackbar({
            title: "Success",
            content: "Variety updated successfully",
            severity: "success",
          });
          setOpenSnack(true);
        }
        console.log(res, "response");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
    handleModal();
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
      <div>{openSnack && handleAlert(snackbar)}</div>
      <form
        style={{
          boxShadow: "0 0 3px #777",
          backgroundColor: "#fff",
          width: "500px",
          padding: "8px 12px",
        }}
        onSubmit={handleSubmit}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="my-3">
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            onChange={(e: any) => setName(e.target.value)}
            placeholder="eg Mac coffee"
            value={name}
          />
        </div>
        <div className="my-3">
          <Label>Index</Label>
          <Input
            type="number"
            name="index"
            onChange={(e: any) => setIndex(e.target.value)}
            placeholder="eg 2"
            value={index}
          />
        </div>
        <div className="my-3">
          <Label>Taxation rate</Label>
          <Input
            type="number"
            name="taxation"
            onChange={(e: any) => setTax(e.target.value)}
            placeholder="eg 10%"
            value={tax}
          />
        </div>
        <div className="my-3">
          <Label>Discount</Label>
          <Input
            type="number"
            name="discount"
            onChange={(e: any) => setDiscount(e.target.value)}
            placeholder="eg 5%"
            value={discount}
          />
        </div>
        <div className="my-3">
          <Label>Subsidy</Label>
          <Input
            type="number"
            name="subsidy"
            onChange={(e: any) => setSubsidy(e.target.value)}
            placeholder="eg 8%"
            value={subsidy}
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
