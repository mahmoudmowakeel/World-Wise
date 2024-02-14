import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!authUser) navigate("/");
    },
    [authUser, navigate]
  );

  return authUser ? children : null;
}

export default ProtectedRoute;
