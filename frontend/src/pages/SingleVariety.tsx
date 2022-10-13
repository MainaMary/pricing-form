import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

interface Props {
  varietyId: string;
}
const SingleVariety = ({ varietyId }: Props) => {
  const getSingleVariety = async () => {
    try {
      const res = await axios(
        `http://localhost:5000/productsVarieties/${varietyId}`
      );
      return res;
    } catch (error: any) {
      console.log(error);
    }
  };
  const { data, isLoading } = useQuery(["singleVariety"], getSingleVariety);
  console.log(!isLoading && data?.data, "data");
  return (
    <div>
      <p>Name: {data?.data?.name}</p>
      <p>Index: {data?.data?.index}</p>
      <p>Tax: {data?.data?.tax ? data?.data?.tax : "Not recorded"}</p>
      <p>Dsicount: {data?.data?.discount}</p>
      <p>Subsidy:{data?.data?.subsidy}</p>
    </div>
  );
};

export default SingleVariety;
