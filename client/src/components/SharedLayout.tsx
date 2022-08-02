import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "./Navbar";
import { logoutUser } from "../app/features/adminSlice";
import "moment/locale/fr";

import type { RootState } from "../app/store";
import { setShowAlert } from "../app/features/uiStateSlice";

const SharedLayout = () => {
  const { name } = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    dispatch(setShowAlert(false));
  }, [location]);

  const [time, setTime] = useState(new Date().getTime());

  setTimeout(() => setTime(time + 1000), 1000);

  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  moment.locale("fr");
  return (
    <main className="">
      <header className="flex items-center justify-around gap-6 w-full my-container space-y-0">
        <div>{moment(time).locale("fr").format("LLLL")}</div>
        <h2>{name}</h2>
        <button
          className="bg-red-500 text-slate-100 py-2 px-4 rounded-md text-center font-semibold"
          onClick={logout}
        >
          logout
        </button>
      </header>
      <div className="my-container flex flex-col lg:flex-row items-start justify-start space-x-12">
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
};
export default SharedLayout;
