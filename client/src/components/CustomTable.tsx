import { FC, useId } from "react";

import CustomRow from "./CustomRow";

import type { ClientState, ServiceState, TechnicianState } from "../types";

interface Props {
  list: ServiceState[] | ClientState[] | TechnicianState[];
  fields:
    | (keyof ServiceState)[]
    | (keyof ClientState)[]
    | (keyof TechnicianState)[];
}

const CustomTable: FC<Props> = ({ list, fields }) => {
  const id = useId();
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-slate-200">
          {list[0] &&
            ("serviceId" in list[0] ||
              (list[0] && "technicianId" in list[0])) && <th>Edit</th>}
          {fields.map((item) => (
            <th key={id + item} className="py-3">
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {list.map((slice, ind) => (
          <CustomRow
            slice={slice}
            fields={fields}
            key={
              "serviceId" in slice
                ? slice.serviceId
                : "technicianId" in slice
                ? slice.technicianId
                : slice.clientId
            }
            ind={ind}
          />
        ))}
      </tbody>
    </table>
  );
};
export default CustomTable;
