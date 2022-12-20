import { FC, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ScanComponent from "../../components/ScanComponent";
import { takeTool } from "../../services/api";
import { TakeToolAttributes } from "../../types";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";

const TakePage: FC<{
  showErrorMessage: (errorMessage: string) => void;
  authToken: string;
}> = (props) => {
  const { showErrorMessage, authToken } = props;
  const [scannedToolId, setScannedToolId] = useState<string | null>(null);
  const [takeToolResponse, setTakeToolResponse] =
    useState<TakeToolAttributes | null>(null);

  useEffect(() => {
    if (scannedToolId !== null && takeToolResponse === null) {
      const helper = async () => {
        try {
          const res = await takeTool(authToken, scannedToolId);
          setTakeToolResponse(res);
        } catch (err) {
          setScannedToolId(null);
          if (err instanceof AxiosError) {
            showErrorMessage(err.response?.data?.error || err.message);
          } else {
            showErrorMessage("Something went wrong");
          }
        }
      };
      helper();
    }
  }, [authToken, scannedToolId, showErrorMessage, takeToolResponse]);

  return (
    <>
      {takeToolResponse === null ? (
        <>
          <Typography variant="h6">Take Tool by Scanning</Typography>
          <ScanComponent
            setScannedToolId={setScannedToolId}
            showErrorMessage={showErrorMessage}
          />
        </>
      ) : (
        <>
          <Typography variant="h6">Tool Taken Successfully</Typography>
          <Typography>
            Current Status: {takeToolResponse?.current_status}
          </Typography>
          <Typography>Rack: {takeToolResponse?.rack}</Typography>
          <Typography>Usage Type: {takeToolResponse?.usage_type}</Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 2 }}
            component={Link}
            to="/"
          >
            Tools Page
          </Button>
        </>
      )}
    </>
  );
};

export default TakePage;
