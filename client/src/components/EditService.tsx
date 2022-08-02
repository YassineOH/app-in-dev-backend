import { FC, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomSelect from "./CustomSelect";

import type { ServiceState } from "../types";
import { setShowAlert, setShowEdit } from "../app/features/uiStateSlice";

import { updateService, getAllServices } from "../api";

import { RootState } from "../app/store";
import Loader from "./Loader";
import ALert from "./ALert";

interface Props {
  service: ServiceState;
}

const EditService: FC<Props> = ({ service: selectedService }) => {
  const { isLoading, textAlert, showAlert, typeAlert } = useSelector(
    (state: RootState) => state.UIState
  );
  const dispatch = useDispatch();
  const [service, setService] = useState(selectedService);
  const [edit, setEdit] = useState(false);

  const handleSelect = (e: FormEvent) => {
    const name: string = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateService(service);
    await getAllServices();
  };

  return (
    <div className="h-screen w-screen bg-opacity-50 bg-slate-800 fixed top-0 left-0 right-0 flex items-center justify-center">
      {isLoading ? (
        <Loader />
      ) : (
        <form
          className="w-auto flex flex-col items-center border-2 rounded-md border-teal-600 border-solid bg-opacity-100 bg-slate-50 p-10"
          onSubmit={handleSubmit}
        >
          {showAlert && <ALert text={textAlert} type={typeAlert} />}
          <CustomSelect
            list={["option1", "option2", "option3"]}
            value={service.mainService}
            name="mainService"
            labelText="main service"
            handleSelect={handleSelect}
            disabled={!edit}
          />

          <CustomSelect
            list={["option1", "option2", "option3"]}
            value={service.subService}
            name="subService"
            handleSelect={handleSelect}
            disabled={!edit}
            labelText="sub service"
          />

          <CustomSelect
            list={["pending", "completed", "declined"]}
            value={service.status}
            name="status"
            handleSelect={handleSelect}
          />
          <div className="flex justify-center gap-20">
            <input
              type="submit"
              value="Save"
              className="px-4 py-2 rounded-md font-semibold text-slate-100 bg-blue-500 w-32 cursor-pointer"
            />
            <button
              type="button"
              className="px-4 py-2 rounded-md font-semibold text-slate-100 bg-red-500 w-32"
              onClick={() => {
                dispatch(setShowEdit(false));
                dispatch(setShowAlert(false));
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-md font-semibold text-slate-100 bg-slate-500 w-32"
              onClick={() => setEdit(!edit)}
            >
              {edit ? "strict edit" : "edit all"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default EditService;
