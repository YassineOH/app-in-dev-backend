import { AxiosError } from "axios";
import axiosConfig from "./axiosInstance";
import { store } from "../app/store";

import {
  setIsLoading,
  setTextAlert,
  setTypeAlert,
  setShowAlert,
} from "../app/features/uiStateSlice";

import type { ServiceState, MsgResponse } from "../types";

const updateService = async (service: ServiceState): Promise<void> => {
  const { dispatch } = store;
  const authFetch = axiosConfig();
  dispatch(setIsLoading(true));
  const { serviceId } = service;

  try {
    const { data } = await authFetch.patch<MsgResponse>(
      `/services/${serviceId}`,
      {
        service,
      }
    );

    dispatch(setTextAlert(data.msg));
    dispatch(setTypeAlert("success"));
  } catch (error) {
    const err = error as AxiosError<MsgResponse>;
    const msg =
      err.response?.data.msg || "something went wrong please try later";
    dispatch(setTypeAlert("danger"));
    dispatch(setTextAlert(msg));
  }
  dispatch(setIsLoading(false));
  dispatch(setShowAlert(true));
};

export default updateService;
