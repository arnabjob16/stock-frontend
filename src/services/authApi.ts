import axios, { AxiosResponse } from "axios";
import { API_URL } from "../config/config"; // Import API_URL from config file

export const loginApi = async (username: string, password: string) => {
  try {
    const response: AxiosResponse = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
       return error.response;
    }
    throw new Error("An unknown error occurred during login.");
  }
};

export const registerApi = async (email: string, password: string) => {
  try {
    const response: AxiosResponse = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
    });
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    throw new Error("An unknown error occurred during login.");
  }
};

export const logoutApi = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    throw new Error("An unknown error occurred during login.");
  }
};
