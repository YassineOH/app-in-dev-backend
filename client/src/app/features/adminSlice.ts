import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { UserState } from "../../types";

const initialState: UserState = {
  name: localStorage.getItem("name") || "",
  email: "",
  token: localStorage.getItem("token") || "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminUser: (_, action: PayloadAction<UserState>) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("name", action.payload.name);
      return {
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
      };
    },
    logoutUser: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      return initialState;
    },
  },
});

export const { setAdminUser, logoutUser } = adminSlice.actions;

export default adminSlice.reducer;
