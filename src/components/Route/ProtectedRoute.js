import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Routes } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <React.Fragment>
      {loading === false && (
        <Routes>
          <Route
            {...rest}
            element={
              !isAuthenticated || (isAdmin && user.role !== "admin") ? (
                <Navigate to={"/login"} />
              ) : (
                <Component />
              )
            }
          />
        </Routes>
      )}
    </React.Fragment>
  );
};

export default ProtectedRoute;
