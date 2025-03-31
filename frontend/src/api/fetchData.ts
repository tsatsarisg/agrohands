import { redirect } from "react-router";
import { getAuthToken, logout } from "../utils/auth";

export const BASE_URL = "http://localhost/api";

const fetchReadData = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T | null> => {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (response.status === 403) {
    logout();
    redirect("/login");
  }

  if (response.status === 404) {
    return null;
  }

  return response.json();
};

export const fetchWriteData = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (response.status === 403) {
    logout();
    redirect("/login");
  }

  return response.json();
};

export default fetchReadData;
