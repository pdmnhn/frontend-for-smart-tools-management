import axios from "axios";

const localServerURL = "localhost:8000";

export const getId = async (source: "rfid" | "qrcode") => {
  const id = await axios.get<{ id: string }>(`${localServerURL}/${source}}`);
  return id.data.id;
};
