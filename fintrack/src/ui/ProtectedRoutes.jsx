/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/auth/useUser";
import { useEffect } from "react";
import Spinner from "./Spinner";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useUser();
  useEffect(function () {
    if (!isPending && !isAuthenticated) navigate("/login");
  });
  if (isPending) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  if (isAuthenticated) return children;
}

export default ProtectedRoutes;
