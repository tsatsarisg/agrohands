import { redirect } from "react-router";
import { queryClient } from "../api/fetchData";
import { fetchMe } from "../api/Auth";

export const logout = () => {
  localStorage.removeItem("token");
  return redirect("/login");
};

export const authLoader = async () => {
  try {
    const user = await queryClient.fetchQuery({
      queryKey: ["me"],
      queryFn: fetchMe,
      retry: false,
    });

    return user;
  } catch (err) {
    throw redirect("/login");
  }
};

export const onlyGuestLoader = async () => {
  try {
    const user = await queryClient.fetchQuery({
      queryKey: ["me"],
      queryFn: fetchMe,
      retry: false,
    });

    if (user) throw redirect("/");
  } catch (e) {
    return null;
  }
};
