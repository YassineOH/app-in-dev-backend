import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { TechnicianState } from "../../types";

const initialState: TechnicianState[] = [];

const techniciansSlice = createSlice({
  name: "technicians",
  initialState,
  reducers: {
    setTechnicians: (_, action: PayloadAction<TechnicianState[]>) => {
      return action.payload;
    },

    editTechnician: (state, action: PayloadAction<TechnicianState>) => {
      const { technicianId: id } = action.payload;

      state.map((technician) => {
        if (technician.technicianId === id) {
          technician = action.payload;
        }
        return technician;
      });
    },

    deleteTechnician: (state, action: PayloadAction<string>) => {
      return state.filter(
        (technician) => technician.technicianId !== action.payload
      );
    },
  },
});

export const { setTechnicians, deleteTechnician, editTechnician } =
  techniciansSlice.actions;

export default techniciansSlice.reducer;
