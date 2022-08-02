import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../app/store";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.admin);
  if (token === "") {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
