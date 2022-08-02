import { AxiosError } from "axios";
import { setClients } from "../app/features/clientSlice";
import axiosConfig from "./axiosInstance";

import {
  setIsLoading,
  setShowAlert,
  setTextAlert,
  setTypeAlert,
} from "../app/features/uiStateSlice";

import { store } from "../app/store";

import type { ClientState, MsgResponse, ClientResponse } from "../types";

const getAllClients = async (): Promise<void> => {
  const authFetch = axiosConfig();

  store.dispatch(setIsLoading(true));
  try {
    const response = await authFetch.get("/clients");
    const { clients } = response.data;
    const newClients = clients.map((ser: ClientResponse): ClientState => {
      const { _id: clientId, name, phoneNumber, city, address } = ser;

      return {
        name,
        clientId,
        phoneNumber,
        city,
        address,
      };
    });
    store.dispatch(setClients(newClients));
  } catch (error) {
    const err = error as AxiosError<MsgResponse>;
    const msg =
      err.response?.data.msg || "something went wrong please try later";

    store.dispatch(setTextAlert(msg));
    store.dispatch(setTypeAlert("danger"));
    store.dispatch(setShowAlert(true));
  }
  store.dispatch(setIsLoading(false));
};

export default getAllClients;
