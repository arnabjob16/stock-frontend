import { apiRequest } from "./apiRequest";

export const customerList = async (token: string | null, page: number | null, search: string | null) => {
  try {
    return await apiRequest("GET", "/users", token, {page: page, roles: "shopkeeper", search: search });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch users");
    }
    throw new Error("Failed to fetch users");
  }
};
export const customersDelete = async (token: string | null, ids: string[] | null) => {
  try {
    return await apiRequest("DELETE", "/users", token, {ids: ids});
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to delete users");
    }
    throw new Error("Failed to delete users");
  }
};
export const customersDetails = async (token: string | null, id : string) => {
  try {
    return await apiRequest("GET", "/user/"+id, token);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to get user details");
    }
    throw new Error("Failed to get user details");
  }
};
export const customersEdit = async (token: string | null, data : Record<string, any>) => {
  try {
    return await apiRequest("PATCH", "/users", token, data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to edit users");
    }
    throw new Error("Failed to edit users");
  }
};
export const customersAdd = async (token: string | null, data : Record<string, any>) => {
  try {
    return await apiRequest("POST", "/users", token, data); 
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to add users");
    }
    throw new Error("Failed to add users");
  }
};


