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
  // const [id, setId] = useState<string | undefined>();
  const [openModal, setOpenModal] = useState(false);
  //const { data, isLoading, error } = useGetAllVarietiesQuery();
  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };
  useEffect(() => {
    Store.dispatch(fetchVarieties());
  }, []);
  const varietiesArr = useSelector((state: RootState) => state.addVariety);

  const handleDelete = async (id: string | undefined) => {
    setTimeout(() => {
      console.log(id, "id");
      const response = axios.delete(
        `http://localhost:5000/productsVarieties/${id}`
      );
      console.log(response);
      return response;
    }, 500);
  };

  return (
    <div className=" md:mx-32">
      {varietiesArr.status === "Loading..." ? (
        <p>Loading...</p>
      ) : (
        <>
          {varietiesArr.items.length && varietiesArr.status === "success" ? (
            <div className="hidden md:block">
              <table className="md:w-full border-solid mt-20 mb-10 border-collapse border border-slate-500  ">
                <thead>
                  <tr>
                    <th className="text-left p-3 text-lg font-semibold">
                      Name
                    </th>
                    <th className="text-left p-3 text-lg font-semibold">
                      Index
                    </th>
                    <th className="text-left p-3 text-lg font-semibold">Tax</th>
                    <th className="text-left p-3 text-lg font-semibold">
                      Discount
                    </th>
                    <th className="text-left p-3 text-lg font-semibold">
                      Subsidy
                    </th>
                    <th className="text-left p-3 text-lgfont-semibold">
                      Total
                    </th>
                    <th className="text-left p-3 text-lg font-semibold">
                      Date
                    </th>
                    <th className="text-left p-3 text-lg font-semibold">
                      Action items
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {varietiesArr?.items?.length &&
                    varietiesArr?.status === "success" &&
                    varietiesArr?.items?.map((item: Props) => (
                      <tr key={item._id}>
                        <td className=" p-3 text-sm text-gray-700 bg-white">
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
                        <td className="crsor-pointer flex justify-between border-slate-700">
                          <span
                            onClick={() => {
                              console.log("hello world");
                              handleDelete(item._id);
                            }}
                            className="w-20  h-7 felx items-center text-center  mx-3 text-xs font-medium uppercase text-white rounded-lg bg-blue-500"
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
                  console.log("hello world");
                  handleDelete(item._id);
                }}
              >
                x
              </p>
            </div>
            <div className="">
              <div className="my-3 flex justify-between w-3/5">
                <p>Cost</p>
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
            </div>
          </div>
        ))}
      </div>
      <Button onClick={() => navigate("/")}>Add variety</Button>
      <Modal openModal={openModal} handleModal={handleModal} />
    </div>
  );
};
export default Products;
