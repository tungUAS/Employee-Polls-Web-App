import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { NotFound } from "./NotFound";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authedUser = useSelector((state: RootState) => state.authedUser);

  if (!authedUser) {
    return <NotFound/>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;