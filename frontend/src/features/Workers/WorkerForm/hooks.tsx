import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useWorkers } from "../../../pages/Workers/hooks";

export const useBanNewWorker = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data, isLoading, error } = useWorkers("", 1);
  const personalWorker = data?.personalWorker;

  const shouldRedirect = pathname.endsWith("new") && personalWorker;

  useEffect(() => {
    if (shouldRedirect) navigate("/workers");
  }, [shouldRedirect]);
};
