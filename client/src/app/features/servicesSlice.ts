import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ServiceState, ID } from "../../types";

const initialState: ServiceState[] = [];
const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (_, action: PayloadAction<ServiceState[]>) => {
      return action.payload;
    },

    deleteService: (state, action: PayloadAction<ID>) => {
      const { id } = action.payload;
      state = state.filter((ser) => ser.serviceId != id);
    },
  },
});

export const { setServices, deleteService } = serviceSlice.actions;

export default serviceSlice.reducer;
