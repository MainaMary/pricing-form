import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { commafy } from "../tools";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
const SingleVariety = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id, "varietyId");
  const getSingleVariety = async () => {
    try {
      const res = await axios(`http://localhost:5000/productsVarieties/${id}`);
      return res;
    } catch (error: any) {
      console.log(error);
    }
  };
  const { data, isLoading } = useQuery(["singleVariety"], getSingleVariety);
  console.log(data?.data, "data");
  return (
    <div className="bg-white flex shadow-lg m-auto mt-32 items-center justify-center max-w-xl rounded-md">
      <div className="w-full">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="py-4 px-5">
            <h2 className="text-xl">{`${data?.data?.name} receipt`}</h2>
            <div className=" text-align-center divide-y divide-slate-700">
              <div className="flex font-bold justify-between my-6">
                <p>Cost</p>
                <p>{commafy(data?.data?.index)}</p>
              </div>

              <div className="flex font-bold justify-between my-3">
                <p>Tax</p>
                <p>
                  {data?.data?.taxation
                    ? commafy(data?.data?.taxation)
                    : "Not recorded"}
                </p>
              </div>
              <div className="flex font-bold justify-between my-6">
                <p>Discount</p>
                <p>
                  {data?.data?.discount
                    ? commafy(data?.data?.discount)
                    : "Not recorded"}
                </p>
              </div>
              <div className="flex font-bold justify-between my-6">
                <p>Subsidy</p>
                <p>{commafy(data?.data?.subsidy)}</p>
              </div>
              <div className="flex font-bold justify-between my-6">
                <p>Total</p>
                <p>{commafy(data?.data?.total)}</p>
              </div>
            </div>
            <Button onClick={() => navigate("/")}>Add variety</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleVariety;
