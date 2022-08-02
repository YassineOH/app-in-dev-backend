import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { SelectedModel } from "../../types";

const initialState: SelectedModel = {
  clientId: "",
  serviceId: "",
  technicianId: "",
};

const selectedModelSlice = createSlice({
  name: "selectedModal",
  initialState,
  reducers: {
    setServiceID: (state, action: PayloadAction<string>) => {
      state.serviceId = action.payload;
    },

    setClientID: (state, action: PayloadAction<string>) => {
      state.clientId = action.payload;
    },

    setTechnicianID: (state, action: PayloadAction<string>) => {
      state.technicianId = action.payload;
    },
  },
});

export const { setServiceID, setClientID, setTechnicianID } =
  selectedModelSlice.actions;

export default selectedModelSlice.reducer;
