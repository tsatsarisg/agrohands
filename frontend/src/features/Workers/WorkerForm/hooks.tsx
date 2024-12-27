import { useEffect } from "react";
import { useLocation, useNavigate, useRouteLoaderData } from "react-router";

export const useBanNewWorker = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const data = useRouteLoaderData<{
    workers: Worker[];
    personalWorker: Worker | null;
  }>("workers-page");

  const personalWorker = data?.personalWorker;

  const shouldRedirect = pathname.endsWith("new") && personalWorker;

  useEffect(() => {
    if (shouldRedirect) navigate("/workers");
  }, [shouldRedirect]);
};
