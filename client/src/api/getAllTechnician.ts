import { AxiosError } from "axios";
import axiosConfig from "./axiosInstance";
import { store } from "../app/store";
import {
  setIsLoading,
  setShowAlert,
  setTextAlert,
  setTypeAlert,
} from "../app/features/uiStateSlice";
import { MsgResponse, TechnicianResponse, TechnicianState } from "../types";
import { setTechnicians } from "../app/features/techniciansSlice";

const getAllTechnicians = async (): Promise<void> => {
  const { dispatch } = store;
  dispatch(setIsLoading(true));
  const authFetch = axiosConfig();

  try {
    const response = await authFetch.get("/technicians");
    const { technicians } = response.data;

    const newTechnicians = technicians.map(
      (technician: TechnicianResponse): TechnicianState => {
        return {
          technicianId: technician._id,
          ...technician,
        };
      }
    );
    dispatch(setTechnicians(newTechnicians));
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

  dispatch(setIsLoading(false));
};

export default getAllTechnicians;
