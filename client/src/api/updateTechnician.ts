import { AxiosError } from "axios";
import axiosConfig from "./axiosInstance";
import { store } from "../app/store";

import {
  setIsLoading,
  setTextAlert,
  setTypeAlert,
  setShowAlert,
} from "../app/features/uiStateSlice";

import type { TechnicianState, MsgResponse } from "../types";
import getAllTechnicians from "./getAllTechnician";
import { setTechnicianID } from "../app/features/selectedModalSlice";

const updateTechnician = async (technician: TechnicianState): Promise<void> => {
  const authFetch = axiosConfig();
  const { dispatch } = store;
  dispatch(setIsLoading(true));
  const { technicianId } = technician;

  try {
    const { data } = await authFetch.patch<MsgResponse>(
      `/technicians/${technicianId}`,
      {
        technician,
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
  dispatch(setShowAlert(true));
  getAllTechnicians();
  dispatch(setTechnicianID(""));
  dispatch(setIsLoading(false));
};

export default updateTechnician;
