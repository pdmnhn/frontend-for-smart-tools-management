import axios from "axios";
import { TakeToolAttributes, ToolAttributes } from "../types";

const API_URL =
  "https://smart-inventory-tools-and-asset-tracking.onrender.com/api";

export const getAuthToken = async (loginId: string) => {
  const res = await axios.post<{ token: string }>(`${API_URL}/account/signin`, {
    loginId,
  });
  return res.data.token;
};

export const getUserTools = async (bearerToken: string) => {
  const res = await axios.get<Array<ToolAttributes>>(`${API_URL}/tools`, {
    headers: { Authorization: `bearer ${bearerToken}` },
  });
  return res.data;
};

export const takeTool = async (bearerToken: string, scannedToolId: string) => {
  const res = await axios.post<TakeToolAttributes>(
    `${API_URL}/tools/take`,
    { encryptionCode: scannedToolId },
    {
      headers: { Authorization: `bearer ${bearerToken}` },
    }
  );
  return res.data;
};
