import axios from "axios";
import type { AxiosError } from "axios";

import { store } from "../app/store";

import type { RegisterUserRequest, MsgResponse } from "../types";
import {
  setIsLoading,
  setShowAlert,
  setTextAlert,
  setTypeAlert,
} from "../app/features/uiStateSlice";

const registerUser = async ({
  name,
  email,
  password,
  phoneNumber,
}: RegisterUserRequest): Promise<void> => {
  const { dispatch } = store;
  dispatch(setIsLoading(true));
  try {
    const response = await axios.post<MsgResponse>("/api/v1/auth/register", {
      name,
      email,
      password,
      phoneNumber,
    });

    dispatch(setTextAlert(response.data.msg));
    dispatch(setTypeAlert("success"));
  } catch (error) {
    const err = error as AxiosError<MsgResponse>;
    const msg =
      err.response?.data.msg || "something went wrong please try later again";
    dispatch(setTextAlert(msg));
    dispatch(setTypeAlert("danger"));
  }
  dispatch(setShowAlert(true));
};

export default registerUser;
