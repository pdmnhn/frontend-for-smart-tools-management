import axios from "axios";

const LOCAL_API_URL = "http://127.0.0.1:8000";

export const getId = async (source: "rfid" | "qrcode") => {
  const res = await axios.get<{ id: string }>(`${LOCAL_API_URL}/${source}`);
  return res.data.id;
};
