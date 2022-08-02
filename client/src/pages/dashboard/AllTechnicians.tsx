import { FC, FormEvent, useState, useId, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CustomInput, ALert, Loader, CustomTable } from "../../components";

import type { RootState } from "../../app/store";
import {
  setShowAlert,
  setTextAlert,
  setTypeAlert,
} from "../../app/features/uiStateSlice";
import { createTechnician, getAllTechnicians } from "../../api";
import { TechnicianState } from "../../types";
import updateTechnician from "../../api/updateTechnician";

const AddTechnician: FC = () => {
  const dispatch = useDispatch();
  const technicians = useSelector((state: RootState) => state.technicians);
  const { technicianId } = useSelector(
    (state: RootState) => state.selectedModal
  );
  const { showAlert, textAlert, typeAlert, isLoading } = useSelector(
    (state: RootState) => state.UIState
  );

  const id = useId();
  const [editMode, setEditMode] = useState(false);
  const [technician, setTechnician] = useState({
    firstName: "",
    lastName: "",
    mainService: "",
    city: "",
    phoneNumber: "",
  });

  useEffect(() => {
    getAllTechnicians();
  }, []);

  useEffect(() => {
    const selectedTechnician = technicians.find(
      (tech) => tech.technicianId === technicianId
    );

    if (selectedTechnician) {
      const { firstName, lastName, mainService, city, phoneNumber } =
        selectedTechnician;
      setTechnician({ firstName, lastName, mainService, city, phoneNumber });
      setEditMode(true);
    }
  }, [technicianId]);

  const handleChange = (e: FormEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;

    dispatch(setShowAlert(false));
    setTechnician({ ...technician, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (Object.values(technician).includes("")) {
      dispatch(setTextAlert("please provide all values"));
      dispatch(setTypeAlert("danger"));
      dispatch(setShowAlert(true));
    }
    if (editMode) {
      updateTechnician({ ...technician, technicianId });
    } else {
      createTechnician({ ...technician, technicianId: "" });
    }

    setTechnician({
      firstName: "",
      lastName: "",
      mainService: "",
      city: "",
      phoneNumber: "",
    });
  };

  const fields: (keyof TechnicianState)[] = [
    "firstName",
    "mainService",
    "lastName",
    "city",
    "phoneNumber",
  ];

  return (
    <section className="w-full">
      {showAlert && <ALert type={typeAlert} text={textAlert} />}

      <form
        className="shadow-md py-3 px-16 flex flex-wrap gap-x-12 gap-y-5 justify-start mb-20"
        onSubmit={handleSubmit}
      >
        {Object.keys(technician).map((key) => (
          <CustomInput
            key={id + key}
            name={key}
            type="text"
            value={technician[key as keyof typeof technician]}
            handleChange={handleChange}
          />
        ))}
        <div className="flex">
          {!editMode ? (
            <input
              type="submit"
              value="Add"
              className="w-72 bg-teal-600 rounded-md text-slate-50 font-semibold cursor-pointer h-12 self-center"
            />
          ) : (
            <input
              type="submit"
              value="update"
              className="w-72 bg-teal-600 rounded-md text-slate-50 font-semibold cursor-pointer h-12 self-center"
            />
          )}
        </div>
      </form>

      {isLoading ? (
        <Loader />
      ) : (
        technicians.length !== 0 && (
          <CustomTable list={technicians} fields={fields} />
        )
      )}
      {!isLoading && technicians.length === 0 && (
        <h3> there is no technicians to show </h3>
      )}
    </section>
  );
};
export default AddTechnician;
