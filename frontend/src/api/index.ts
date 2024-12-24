import { getAuthToken } from "../utils/auth";

export const domain = "http://localhost:8080/api";

export const getAuthorizationHeader = () => {
  return {
    Authorization: `Bearer ${getAuthToken()}`,
  };
};
