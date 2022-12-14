import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FormType } from "../types";

interface SProps {
  status: string;
  items: any;
}
const initialState: SProps = {
  items: [],
  status: "",
};
export const addVarieties = createAsyncThunk(
  "variety/AddVariety",
  async (payload: FormType, { rejectWithValue }: any) => {
    try {
      const response = await axios.post(
        "https://price-setter.onrender.com/productsVarieties",
        payload
      );

      return response?.data;
    } catch (error: any) {
      return rejectWithValue;
    }
  }
);

export const CreateVarietySlice = createSlice({
  name: "postVariety",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addVarieties.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addVarieties.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(addVarieties.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});
export default CreateVarietySlice.reducer;
