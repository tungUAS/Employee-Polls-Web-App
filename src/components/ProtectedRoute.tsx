import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { Protected } from "./Protected";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authedUser = useSelector((state: RootState) => state.authedUser);

  if (!authedUser) {
    localStorage.setItem("redirect", window.location.pathname);
    return <Protected/>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;