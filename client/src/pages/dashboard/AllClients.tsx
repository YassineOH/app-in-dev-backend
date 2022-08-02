import { useEffect } from "react";
import { useSelector } from "react-redux";

import { CustomTable, Loader } from "../../components";
import { getAllClients } from "../../api";

import type { RootState } from "../../app/store";
import type { ClientState } from "../../types";

const AllClients = () => {
  const clients = useSelector((state: RootState) => state.clients);
  const { isLoading } = useSelector((state: RootState) => state.UIState);

  useEffect(() => {
    getAllClients();
  }, []);

  const fields: (keyof ClientState)[] = [
    "name",
    "phoneNumber",
    "city",
    "address",
  ];

  return (
    <div className="w-full">
      {isLoading ? <Loader /> : <CustomTable list={clients} fields={fields} />}
      {/* {showAlert && <ALert type={typeAlert} text={textAlert} />} */}
      {/* {showEdit && (
      <EditService
        service={services.filter((ser) => ser.serviceId === serviceId)[0]}
      />
    )} */}
    </div>
  );
};
export default AllClients;
