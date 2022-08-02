import { useEffect } from "react";
import { useSelector } from "react-redux";

import { ALert, CustomTable, EditService, Loader } from "../../components";
import { getAllServices } from "../../api";

import type { RootState } from "../../app/store";
import type { ServiceState } from "../../types";

const AllServices = () => {
  const services = useSelector((state: RootState) => state.services);
  const { showEdit } = useSelector((state: RootState) => state.UIState);
  const { serviceId } = useSelector((state: RootState) => state.selectedModal);
  const { isLoading, showAlert, textAlert, typeAlert } = useSelector(
    (state: RootState) => state.UIState
  );

  useEffect(() => {
    getAllServices();
  }, []);

  const fields: (keyof ServiceState)[] = [
    "mainService",
    "subService",
    "date",
    "clientName",
    "status",
    "createdAt",
  ];

  return (
    <div className="w-full">
      {isLoading ? <Loader /> : <CustomTable list={services} fields={fields} />}
      {!isLoading && services.length === 0 && (
        <h3> there is no services to show </h3>
      )}
      {showAlert && <ALert type={typeAlert} text={textAlert} />}
      {showEdit && (
        <EditService
          service={services.filter((ser) => ser.serviceId === serviceId)[0]}
        />
      )}
    </div>
  );
};
export default AllServices;
