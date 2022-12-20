import { FC, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ScanComponent from "../../components/ScanComponent";
import { returnTool } from "../../services/api";
import {
  ReturnToolAttributes,
  ToolStatusKeys,
  ToolStatusKeyValuePairs,
} from "../../types";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";

const ReturnPage: FC<{
  showErrorMessage: (errorMessage: string) => void;
  authToken: string;
}> = (props) => {
  const { showErrorMessage, authToken } = props;
  const [scannedToolId, setScannedToolId] = useState<string | null>(null);
  const [returnToolResponse, setReturnToolResponse] =
    useState<ReturnToolAttributes | null>(null);
  const [status, setStatus] = useState<typeof ToolStatusKeys>(
    // @ts-ignore
    ToolStatusKeys[0]
  );

  useEffect(() => {
    if (scannedToolId !== null && returnToolResponse === null) {
      const helper = async () => {
        try {
          const res = await returnTool(authToken, scannedToolId, status);
          setReturnToolResponse(res);
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
  }, [authToken, scannedToolId, showErrorMessage, returnToolResponse, status]);

  return (
    <>
      {returnToolResponse === null ? (
        <>
          <Typography variant="h6">Return Tool by Scanning</Typography>
          <ScanComponent
            setScannedToolId={setScannedToolId}
            showErrorMessage={showErrorMessage}
          />
          <Container
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Select
              // @ts-ignore
              value={status}
              onChange={(event: SelectChangeEvent) => {
                // @ts-ignore
                setStatus(event.target.value as string);
              }}
            >
              {ToolStatusKeyValuePairs.map((keyVal) => {
                return (
                  <MenuItem key={keyVal.key} value={keyVal.key}>
                    {keyVal.value}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>Status of the tool</FormHelperText>
          </Container>
        </>
      ) : (
        <>
          <Typography variant="h6">Tool Returned Successfully</Typography>
          <Typography>Rack: {returnToolResponse?.rack}</Typography>
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

export default ReturnPage;
