import axios, { AxiosError } from "axios";
import { setAdminUser } from "../app/features/adminSlice";
import {
  setShowAlert,
  setTextAlert,
  setTypeAlert,
} from "../app/features/uiStateSlice";

import { store } from "../app/store";

import type { LoginResponse, LoginRequest, MsgResponse } from "../types";

const loginUser = async ({ email, password }: LoginRequest): Promise<void> => {
  const { dispatch } = store;
  try {
    const response = await axios.post<LoginResponse>("/api/v1/auth/login", {
      email,
      password,
    });
    const { token, name } = response.data;

    dispatch(setTextAlert("Successfully login in"));
    dispatch(setTypeAlert("success"));
    dispatch(setAdminUser({ token, name, email }));

    dispatch(setShowAlert(true));
  } catch (error) {
    const err = error as AxiosError<MsgResponse>;
    const msg =
      err.response?.data.msg || "something went wrong please try again";
    dispatch(setTextAlert(msg));
    dispatch(setTypeAlert("danger"));

    dispatch(setShowAlert(true));
  }
};

export default loginUser;
