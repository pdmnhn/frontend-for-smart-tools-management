import { FC } from "react";
import { AxiosError } from "axios";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { getId } from "../services/localApi";

const ScanComponent: FC<{
  setScannedToolId: (scannedToolId: string) => void;
  showErrorMessage: (errorMessage: string) => void;
}> = (props) => {
  const { setScannedToolId, showErrorMessage } = props;

  const handleScan = (source: "rfid" | "qrcode") => {
    return async () => {
      try {
        setScannedToolId(await getId(source));
      } catch (err) {
        handleError(err);
      }
    };
  };

  const handleError = (err: unknown) => {
    if (err instanceof AxiosError) {
      showErrorMessage(err.response?.data?.error || err.message);
    } else {
      showErrorMessage("Something went wrong");
    }
  };

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        mt: 4,
      }}
    >
      <Button variant="contained" sx={{ mr: 2 }} onClick={handleScan("rfid")}>
        RFID
      </Button>
      <Button variant="contained" sx={{ ml: 2 }} onClick={handleScan("qrcode")}>
        QR Code
      </Button>
    </Container>
  );
};

export default ScanComponent;
