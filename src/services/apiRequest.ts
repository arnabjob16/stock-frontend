import axios, { AxiosResponse } from "axios";
import { API_URL } from "../config/config";

export const apiRequest = async (
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  token: string | null = null,
  params: object | FormData | null = null
): Promise<AxiosResponse | { status: 'success' | 'info' | 'danger'; message: string; data: any }> => {
  try {
    const headers: Record<string, string> = {};

    if (token) {
      headers["Authorization"] = token;
    }
    if (!(params instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const config: any = {
      method,
      url: `${API_URL}${url}`,
      headers,
    };

    if (method === "GET" || method === "DELETE") {
      if (params) config.params = params;
    } else {
      if (params) config.data = params;
    }

    const response: AxiosResponse = await axios(config);

    return {
      status: [200, 201, 204].includes(response.status) ? "success" : "danger",
      message: response?.data?.message || "Request failed",
      data: response?.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const statusCode = error?.response?.status ?? 0;
      const message = error?.response?.data?.message || "Request failed";
      const data = error?.response?.data || {};
      return {
        status: [400, 401, 422].includes(statusCode)? 'info': [403, 404, 500].includes(statusCode)? 'danger': 'success',
        message,
        data,
      };
    }
    throw new Error("An unknown error occurred.");
  }
};
