import { redirect } from "react-router";
import { logout } from "../utils/auth";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
export const BASE_URL = "http://localhost/api";

const fetchReadData = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T | null> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
    ...options,
  });

  if (response.status === 403 || response.status === 401) {
    window.location.href = "/login";
    return null;
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
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
    ...options,
  });

  if (response.status === 403 || response.status === 401) {
    window.location.href = "/login";
  }

  return response.json();
};

export async function deleteResource(
  endpoint: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "delete",
    ...options,
  });

  return await response.json();
}

export default fetchReadData;
