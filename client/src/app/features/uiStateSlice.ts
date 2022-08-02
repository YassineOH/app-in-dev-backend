import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { UIState } from "../../types";

const initialState: UIState = {
  textAlert: "",
  typeAlert: "",
  showAlert: false,
  showEdit: false,
  isLoading: false,
};

const uiStateSlice = createSlice({
  name: "UIState",
  initialState,
  reducers: {
    setTextAlert: (state, action: PayloadAction<string>) => {
      state.textAlert = action.payload;
    },

    setTypeAlert: (state, action: PayloadAction<string>) => {
      state.typeAlert = action.payload;
    },

    setShowAlert: (state, action: PayloadAction<boolean>) => {
      state.showAlert = action.payload;
    },

    setShowEdit: (state, action: PayloadAction<boolean>) => {
      state.showEdit = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setTextAlert,
  setTypeAlert,
  setShowAlert,
  setShowEdit,
  setIsLoading,
} = uiStateSlice.actions;

export default uiStateSlice.reducer;
