import { getAuthToken, logout } from "../utils/auth";

export const BASE_URL = "http://localhost:8080/api";

const fetchData = async <T>(
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

  if (response.status === 403) logout();

  return response.json();
};

export default fetchData;
