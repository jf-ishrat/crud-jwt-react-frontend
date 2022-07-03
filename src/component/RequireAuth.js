import React, { useEffect, useState } from "react";
import { useLocation, Navigation, Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedPermissions }) => {
  const auth = useAuth();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   setCurrentUser(auth.user);
  //   console.log("auth.user: ", auth.user.permissions);
  // }, []);

  return auth?.user?.permissions?.find((permission) =>
    allowedPermissions?.includes(permission)
  ) ? (
    <Outlet />
  ) : auth?.user?.access_token ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
