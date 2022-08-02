import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { ClientState } from "../../types";

const initialState: ClientState[] = [];

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (_, action: PayloadAction<ClientState[]>) => {
      return action.payload;
    },
  },
});

export const { setClients } = clientSlice.actions;

export default clientSlice.reducer;
