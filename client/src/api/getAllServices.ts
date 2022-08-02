import { AxiosError } from "axios";
import axiosConfig from "./axiosInstance";
import { store } from "../app/store";
import { setServices } from "../app/features/servicesSlice";
import {
  setShowAlert,
  setTextAlert,
  setTypeAlert,
  setIsLoading,
} from "../app/features/uiStateSlice";

import type { ServiceState, MsgResponse, ServiceResponse } from "../types";

const getAllServices = async (): Promise<void> => {
  store.dispatch(setIsLoading(true));

  const authFetch = axiosConfig();

  try {
    const response = await authFetch.get("/services");
    const { services } = response.data;
    const flatService = services.map((ser: ServiceResponse): ServiceState => {
      const {
        _id: serviceId,
        mainService,
        subService,
        date,
        createdAt,
        status,
        postedBy: { name: clientName, _id: clientId },
      } = ser;

      return {
        serviceId,
        mainService,
        subService,
        date,
        createdAt,
        status,
        clientName,
        clientId,
      };
    });

    store.dispatch(setServices(flatService));
  } catch (error) {
    const err = error as AxiosError<MsgResponse>;
    const msg =
      err.response?.data.msg || "something went wrong please try later";
    store.dispatch(setShowAlert(true));
    store.dispatch(setTextAlert(msg));
    store.dispatch(setTypeAlert("danger"));
  }
  store.dispatch(setIsLoading(false));
};

export default getAllServices;
