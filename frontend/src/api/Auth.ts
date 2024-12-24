import { LoaderFunctionArgs, redirect } from "react-router";
import { domain } from ".";

export async function signup({ request }: LoaderFunctionArgs) {
  const data = await request.formData();

  const authData = {
    fullName: data.get("fullName"),
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`${domain}/signup`, {
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

export async function login({ request }: LoaderFunctionArgs) {
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`${domain}/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(authData),
  });

  if (response.status === 400) return await response.json();
  if (!response.ok) throw new Error("Failed to login");

  const resData = await response.json();

  localStorage.setItem("token", resData.token);
  return redirect("/");
}