import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./features/adminSlice";
import uiStateReducer from "./features/uiStateSlice";
import clientReducer from "./features/clientSlice";
import servicesSlice from "./features/servicesSlice";
import techniciansSlice from "./features/techniciansSlice";
import selectedModalSlice from "./features/selectedModalSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    UIState: uiStateReducer,
    clients: clientReducer,
    services: servicesSlice,
    selectedModal: selectedModalSlice,
    technicians: techniciansSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
