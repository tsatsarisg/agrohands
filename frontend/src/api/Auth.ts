import { LoaderFunctionArgs, redirect } from "react-router";
import { BASE_URL } from "./fetchData";

export async function signup({ request }: LoaderFunctionArgs) {
  const data = await request.formData();

  const authData = {
    fullName: data.get("fullName"),
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`${BASE_URL}/signup`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(authData),
  });

  if (response.status === 400) return response.json();
  if (!response.ok) {
    throw new Error("Failed to sign up");
  }

  return redirect("/login");
}

interface LoginData {
  email?: string;
  password?: string;
}

export async function login(data: LoginData) {
  const response = await fetch(`${BASE_URL}/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response.status === 400) return await response.json();
  if (!response.ok) throw new Error("Failed to login");

  return response.json();
}

export async function logout() {
  const response = await fetch(`${BASE_URL}/logout`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) throw new Error("Failed to logout");

  return response.json();
}

export const fetchMe = async () => {
  const res = await fetch(`${BASE_URL}/users`, { credentials: "include" });
  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
};
