import React, { ReactNode, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface PublicRouteProps {
  children?: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const auth = useContext(AuthContext);
  if (auth?.user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children || <Outlet />;
};

export default PublicRoute;
