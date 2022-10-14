import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";

const SingleVariety = () => {
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
    <Wrapper>
      <div className="w-full">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="py-4 px-5">
            <p>Name: {data?.data?.name}</p>
            <p>Index: {data?.data?.index}</p>
            <p>Tax: {data?.data?.tax ? data?.data?.tax : "Not recorded"}</p>
            <p>Dsicount: {data?.data?.discount}</p>
            <p>Subsidy:{data?.data?.subsidy}</p>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default SingleVariety;
