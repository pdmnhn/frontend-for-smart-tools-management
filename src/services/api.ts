import axios from "axios";
import { ToolsAttributes } from "../types";

const API_URL =
  "https://smart-inventory-tools-and-asset-tracking.onrender.com/api";

export const getAuthToken = async (loginId: string) => {
  const res = await axios.post<{ token: string }>(`${API_URL}/account/signin`, {
    loginId,
  });
  return res.data.token;
};

export const getUserTools = async (bearerToken: string) => {
  const res = await axios.get<Array<ToolsAttributes>>(`${API_URL}/tools`, {
    headers: { Authorization: `bearer ${bearerToken}` },
  });
  return res.data;
};
