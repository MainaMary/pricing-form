import React, { useEffect } from "react";
import { fetchVarieties } from "../features/AddVarietySlice";
import { RootState, Store } from "../store";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
interface Props {
  name: string;
  productId: string;
  index: number;
  discount: number;
  subsidy: number;
  tax: number;
  id?: string;
  date: any;
  total: number;
}
interface Iprops {
  status: string;
  items: any;
}
const Products = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Store.dispatch(fetchVarieties());
  }, []);
  const varietiesArr = useSelector((state: RootState) => state.variety);
  console.log(varietiesArr, "varieties");

  return (
    <div className="px-7">
      {varietiesArr.status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-solid mt-20 mb-10">
          <thead>
            <tr>
              <th className="text-left mb-3">Name</th>
              <th className="text-left mb-3">Index</th>
              <th className="text-left mb-3">Discount</th>
              <th className="text-left mb-3">Subsidy</th>
              <th className="text-left mb-3">Total</th>
              <th className="text-left mb-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {varietiesArr.items.length &&
              varietiesArr.status === "success" &&
              varietiesArr.items.map((item: Props) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.index}</td>
                  <td>{item.discount ? item.discount : "Not recorded"}</td>
                  <td>{item.subsidy ? item.subsidy : "Not recorded"}</td>
                  <td>{item.total}</td>
                  <td>{item.date}</td>
                  <td className="flex justify-between">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <Button onClick={() => navigate("/")}>Add variety</Button>
    </div>
  );
};
export default Products;
