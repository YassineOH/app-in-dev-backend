import { AxiosError } from "axios";

import axiosConfig from "./axiosInstance";

import { store } from "../app/store";
import {
  setShowAlert,
  setTypeAlert,
  setTextAlert,
  setIsLoading,
} from "../app/features/uiStateSlice";

import type { TechnicianState, MsgResponse } from "../types";
import getAllTechnicians from "./getAllTechnician";

const createTechnician = async (technician: TechnicianState) => {
  const { dispatch } = store;
  const authFetch = axiosConfig();

  dispatch(setIsLoading(true));
  try {
    const { data } = await authFetch.post<MsgResponse>(
      "/technicians",
      technician
    );

    dispatch(setTextAlert(data.msg));
    dispatch(setTypeAlert("success"));
    dispatch(setShowAlert(true));
    setTimeout(() => dispatch(setShowAlert(false)), 3000);
  } catch (error) {
    const err = error as AxiosError<MsgResponse>;

    dispatch(
      setTextAlert(
        err.response?.data.msg || "something went wrong please try later"
      )
    );
    dispatch(setTypeAlert("danger"));
    dispatch(setShowAlert(true));
  }

  getAllTechnicians();
  dispatch(setIsLoading(false));
};

export default createTechnician;
