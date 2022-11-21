import React, { useEffect, useState } from "react";
import { fetchVarieties } from "../features/AddVarietySlice";
import { RootState, Store } from "../store";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { commafy, formatDateTo } from "../tools";
import axios from "axios";
import Modal from "../components/Modal";
import { useGetAllVarietiesQuery } from "../features/VarietyApis";
import { FormType, SnackbarProps } from "../types";
import CustomAlert from "../components/CustomAlert";
interface Props {
  name: string;
  productId: string;
  index: number;
  discount: number;
  subsidy: number;
  taxation: number;
  _id?: string;
  date: any;
  total: number;
}
interface Iprops {
  status: string;
  items: any;
}
const Products = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<SnackbarProps>({
    title: "",
    content: "",
    severity: "",
  });
  const [itemInfo, setItemInfo] = useState({});
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);

  //const { data, isLoading, error } = useGetAllVarietiesQuery('products);
  const handleModal = () => {
    setOpenModal((prev) => !prev);
    console.log("open modal");
  };
  console.log(openModal);
  useEffect(() => {
    Store.dispatch(fetchVarieties());
  }, []);
  const varietiesArr = useSelector((state: RootState) => state.addVariety);

  const handleDelete = async (id: string | undefined) => {
    setTimeout(() => {
      console.log(id, "id");
      const response = axios
        .delete(`https://pricing-form.herokuapp.com/productsVarieties/${id}`)
        .then((res) => {
          if (res.statusText === "OK") {
            setSnackbar({
              title: "Success",
              content: "Variety deleted successfully",
              severity: "success",
            });
            setOpenSnack(true);
          }
          Store.dispatch(fetchVarieties());
        });

      return response;
    }, 500);
  };
  let itemDetails = {};
  const handleEdit = (item: FormType) => {
    itemDetails = Object.assign({}, item);

    //axios.put(`http://localhost:5000/productsVarieties/${item._id}`);
    handleModal();
  };

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
  const obj = {
    id: 1,
    name: "hey",
  };
  const arr = [
    { id: 1, name: "hey" },
    {
      id: 1,
      name: "How are you",
    },
  ];
  const objectExists = (obj: any, arr: any[]) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  };
  objectExists(obj, arr);

  return (
    <div className=" md:mx-32">
      {varietiesArr.status === "Loading..." ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>{openSnack && handleAlert(snackbar)}</div>
          {varietiesArr.items.length ? (
            <div className="hidden md:block">
              <table className="md:w-full border-solid mt-20 mb-10 border-collapse border rounded-2xl bg-white shadow-lg">
                <thead>
                  <tr>
                    <th className="text-left p-3 text-lg font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="text-left p-3 text-lg font-semibold text-gray-700">
                      Index
                    </th>
                    <th className="text-left p-3 text-lg font-semibold text-gray-700">
                      Tax
                    </th>
                    <th className="text-left p-3 text-lg font-semibold text-gray-700">
                      Discount
                    </th>
                    <th className="text-left p-3 text-lg font-semibold text-gray-700">
                      Subsidy
                    </th>
                    <th className="text-left p-3 text-lgfont-semibold text-gray-700">
                      Total
                    </th>
                    <th className="text-left p-3 text-lg font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="text-left p-3 text-lg font-semibold text-gray-700">
                      Action items
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {varietiesArr?.items?.length &&
                    varietiesArr?.status === "success" &&
                    varietiesArr?.items?.map((item: Props) => (
                      <tr key={item._id}>
                        <td className=" p-3 text-sm text-gray-700 ">
                          {item.name}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {commafy(item.index)}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {item.taxation
                            ? commafy(item.taxation)
                            : "Not recorded"}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {item.discount
                            ? commafy(item.discount)
                            : "Not recorded"}
                        </td>
                        <td className=" p-3 text-sm text-gray-700">
                          {item.subsidy
                            ? commafy(item.subsidy)
                            : "Not recorded"}
                        </td>
                        <td className=" p-3 text-sm text-gray-700">
                          {item.total ? commafy(item.total) : "Not recorded"}
                        </td>
                        <td className=" p-3 text-sm text-gray-700">
                          {item.date ? formatDateTo(item.date) : "Not recorded"}
                        </td>
                        <td className="p-3 crsor-pointer flex h-auto items-center justify-between border-slate-700">
                          <span
                            onClick={() => {
                              handleEdit(item), setItemInfo(item);
                            }}
                            className="w-1/2  h-7 flex text-white font-bold justify-center  items-center text-center  mx-3 text-xs  uppercase  rounded-lg bg-gray-700"
                          >
                            Edit
                          </span>
                          <span
                            onClick={() => {
                              // setId(item._id);
                              handleDelete(item._id);
                            }}
                            className="w-1/2  h-7 flex text-white font-bold justify-center  items-center text-center  mx-3 text-xs  uppercase  rounded-lg bg-gray-700"
                          >
                            Delete
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            "Product varieties not added"
          )}
        </>
      )}
      <div className=" px-8 grid grid-cols-1 gap-4 md:hidden">
        {varietiesArr.items.map((item: Props) => (
          <div className="bg-white p-4 rounded-lg shadow" key={item._id}>
            <div className="flex justify-between w-full bg-white">
              <p>{item.name}</p>
              <p>{item.date ? formatDateTo(item.date) : "Not recorded"}</p>
              <p
                onClick={() => {
                  // setId(item._id);

                  handleDelete(item._id);
                }}
              >
                x
              </p>
            </div>
            <div className="">
              <div className="my-3 flex justify-between w-3/5">
                <p className="text-gray-700">Cost</p>
                <p className="text-right ">{commafy(item.index)}</p>
              </div>
              <div className="my-3 flex justify-between w-3/5">
                <p>Tax</p>
                <p className="text-left">
                  {item.taxation ? commafy(item.taxation) : "Not recorded"}
                </p>
              </div>
              <div className="my-3 flex justify-between w-3/5">
                <p>Discount</p>

                <p className="text-left">
                  {item.discount ? commafy(item.discount) : "Not recorded"}
                </p>
              </div>
              <div className="my-3 flex justify-between w-3/5">
                <p>Subsidy</p>
                <p className="text-left">
                  {item.subsidy ? commafy(item.subsidy) : "Not recorded"}
                </p>
              </div>
              <div className="my-3 flex justify-between w-3/5">
                <p className="text-gray-700 font-bold">Total</p>
                <p className="text-left text-gray-700 font-bold">
                  {item.total ? commafy(item.total) : "Not recorded"}
                </p>
              </div>
              <div>
                <Button
                  onClick={() => {
                    handleEdit(item), setItemInfo(item);
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={() => navigate("/")}>Add variety</Button>
      <Modal
        openModal={openModal}
        handleModal={handleModal}
        itemInfo={itemInfo}
      />
    </div>
  );
};
export default Products;
