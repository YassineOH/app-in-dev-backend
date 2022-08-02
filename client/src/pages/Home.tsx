import { FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CustomInput, ALert } from "../components";
import { loginUser, registerUser } from "../api";
import {
  setTextAlert,
  setShowAlert,
  setTypeAlert,
} from "../app/features/uiStateSlice";

import type { RootState } from "../app/store";

interface User {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const initialUser: User = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
};

const Home = () => {
  const { showAlert, textAlert, typeAlert } = useSelector(
    (state: RootState) => state.UIState
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [logPage, setLogPage] = useState(true);
  const [user, setUser] = useState(initialUser);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { name, email, password, phoneNumber } = user;
    if (!email || !password || (!logPage && !name && !phoneNumber)) {
      dispatch(setShowAlert(true));
      dispatch(setTextAlert("please provide all values"));
      dispatch(setTypeAlert("danger"));
      return;
    }

    if (logPage) {
      loginUser({ email, password });

      setTimeout(() => {
        if (localStorage.getItem("token")) {
          dispatch(setShowAlert(false));
          navigate("/services");
        }
      }, 1500);
    } else {
      registerUser({
        email,
        password,
        name,
        phoneNumber,
      });
    }

    setUser(initialUser);
  };

  const handleChange = (e: FormEvent) => {
    setUser((user) => {
      return {
        ...user,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
          .value,
      };
    });
    dispatch(setShowAlert(false));
  };

  return (
    <section className="my-container text-center h-screen flex flex-col justify-center">
      <h2 className="text-xl">{logPage ? "login" : "Register"}</h2>
      {showAlert && <ALert type={typeAlert} text={textAlert} />}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-5 justify-center mx-auto border-slate-400 border-2 border-solid "
      >
        {!logPage && (
          <CustomInput
            type="text"
            value={user.name}
            name="name"
            handleChange={handleChange}
          />
        )}
        {!logPage && (
          <CustomInput
            type="tel"
            value={user.phoneNumber}
            name="phoneNumber"
            handleChange={handleChange}
            labelText="Phone Number"
          />
        )}
        <CustomInput
          type="email"
          value={user.email}
          name="email"
          handleChange={handleChange}
        />
        <CustomInput
          type="password"
          value={user.password}
          name="password"
          handleChange={handleChange}
        />
        <input
          type="submit"
          value={logPage ? "login" : "Register"}
          className="my-btn"
        />
      </form>
      <button
        className="border-none text-slate-800 cursor-pointer mt-8"
        onClick={() => {
          setLogPage(!logPage);
          dispatch(setShowAlert(false));
        }}
      >
        <span className="text-blue-500">{!logPage ? "login" : "Register"}</span>{" "}
        instead
      </button>
    </section>
  );
};
export default Home;
