import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { varietyUrl } from "../apis";
interface VProps {
  name: string;
  index: number;
  tax: number;
  discount: number;
  subsidy: number;
}
const initialState = {
  items: [],
  status: "",
};
export const fetchVarieties = createAsyncThunk(
  "variety/fetchVarieties",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/productsVarieties"
      );

      return response?.data;
    } catch (error: any) {
      console.log(error.messaage);
    }
  }
);
fetchVarieties();
export const AddVarietySlice = createSlice({
  name: "variety",
  initialState,
  reducers: {
    addVariety: (state, action: PayloadAction<VProps>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVarieties.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchVarieties.fulfilled, (state, action) => {
        const newEntities = {};
        state.items = action.payload;
        // action.payload.forEach((variety: any) => {
        //   newEntities[variety.id] = variety;
        // });
        // state.items = newEntities;
        state.status = "success";
      })
      .addCase(fetchVarieties.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});
export const { addVariety } = AddVarietySlice.actions;
export default AddVarietySlice.reducer;
