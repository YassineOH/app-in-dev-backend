import { FC } from "react";
import type { ClientState } from "../types";

interface Props {
  client: ClientState;
}

const Client: FC<Props> = ({ client }) => {
  return (
    <tr className=" text-center">
      <td>{client.name}</td>
      <td>{client.phoneNumber}</td>
      <td>{client.city}</td>
      <td>{client.address}</td>
    </tr>
  );
};
export default Client;
