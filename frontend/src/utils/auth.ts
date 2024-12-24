import { redirect } from "react-router";

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
  return redirect("/login");
};

export const tokenLoader = () => {
  return getAuthToken();
};

export const checkAuthLoader = () => {
  const token = getAuthToken();
  if (!token) {
    return redirect("/login");
  }
  return null;
};

export const banAuthLoader = () => {
  const token = getAuthToken();
  if (token) return redirect("/");

  return null;
};
