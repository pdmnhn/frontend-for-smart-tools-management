import { FC, useEffect, useState } from "react";

import Typography from "@mui/material/Typography";

import ScanComponent from "../../components/ScanComponent";
import { takeTool } from "../../services/api";
import { TakeToolAttributes } from "../../types";

const TakePage: FC<{
  showErrorMessage: (errorMessage: string) => void;
  authToken: string;
}> = (props) => {
  const { showErrorMessage, authToken } = props;
  const [scannedToolId, setScannedToolId] = useState<string | null>(null);
  const [takeToolRes, setTakeToolRes] = useState<TakeToolAttributes | null>(
    null
  );

  useEffect(() => {
    if (scannedToolId !== null) {
      const helper = async () => {
        const res = await takeTool(authToken, scannedToolId);
        console.log(res);
        setTakeToolRes(res);
      };
      helper();
    }
  }, [authToken, scannedToolId]);

  return (
    <>
      {setTakeToolRes === null ? (
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
          <Typography>Current Status: {takeToolRes?.current_status}</Typography>
          <Typography>Rack: {takeToolRes?.rack}</Typography>
          <Typography>Usage Type: {takeToolRes?.usage_type}</Typography>
        </>
      )}
    </>
  );
};

export default TakePage;
