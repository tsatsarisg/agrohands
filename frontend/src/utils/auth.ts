import { redirect } from "react-router";
import { queryClient } from "../api/fetchData";
import { fetchMe, logout } from "../api/Auth";

export const logoutAction = async () => {
  try {
    await queryClient.fetchQuery({
      queryKey: ["logout"],
      queryFn: logout,
      retry: false,
    });
    return redirect("/login");
  } catch (err) {
    return redirect("/login");
  }
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
