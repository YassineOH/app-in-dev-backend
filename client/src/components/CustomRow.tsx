import { FC, useId } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { FaEdit } from "react-icons/fa";

import type { ClientState, ServiceState, TechnicianState } from "../types";
import {
  setServiceID,
  setTechnicianID,
} from "../app/features/selectedModalSlice";
import { setIsLoading, setShowEdit } from "../app/features/uiStateSlice";

interface Props {
  fields:
    | (keyof ServiceState)[]
    | (keyof ClientState)[]
    | (keyof TechnicianState)[];
  slice: ServiceState | ClientState | TechnicianState;
  ind: number;
}

const CustomRow: FC<Props> = ({ slice, fields, ind }) => {
  const dispatch = useDispatch();
  const id = useId();

  const isServiceSlice = "serviceId" in slice;
  const isTechnicianSlice = "technicianId" in slice;

  const key = isServiceSlice
    ? slice.serviceId
    : isTechnicianSlice
    ? slice.technicianId
    : slice.clientId;

  const rowStyle =
    ind % 2 === 1 ? "text-center h-10 bg-slate-100" : "text-center h-10";

  const handleClick = () => {
    if (isServiceSlice) {
      dispatch(setServiceID(slice.serviceId));
      dispatch(setIsLoading(false));
      dispatch(setShowEdit(true));
    } else if (isTechnicianSlice) {
      dispatch(setTechnicianID(slice.technicianId));
    }
  };

  return (
    <>
      <tr className={rowStyle}>
        {(isTechnicianSlice || isServiceSlice) && (
          <td>
            <button onClick={handleClick}>
              <FaEdit />
            </button>
          </td>
        )}

        {fields.map((field) => {
          switch (field) {
            case "date":
            case "createdAt":
              return (
                <td key={id + key + field}>
                  {isServiceSlice &&
                    moment(slice[field]).locale("fr").format("LL")}
                </td>
              );

            case "clientName": {
              return (
                isServiceSlice && (
                  <td
                    key={id + key + field}
                    onClick={() => console.log(slice.clientId)}
                    className="cursor-pointer underline text-teal-800"
                  >
                    {slice["clientName"]}
                  </td>
                )
              );
            }

            default:
              if (isServiceSlice) {
                return (
                  <td key={id + key + field}>
                    {slice[field as keyof ServiceState]}
                  </td>
                );
              } else if (isTechnicianSlice) {
                return (
                  <td key={id + key + field}>
                    {slice[field as keyof TechnicianState]}
                  </td>
                );
              } else {
                return (
                  <td key={id + key + field}>
                    {slice[field as keyof ClientState]}
                  </td>
                );
              }
          }
        })}
      </tr>
    </>
  );
};
export default CustomRow;
