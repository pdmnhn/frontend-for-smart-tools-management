import { FC, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getId } from "../services/localApi";
import { AxiosError } from "axios";
import { getAuthToken } from "../services/api";

const HomePage: FC<{
  setAuthToken: (authToken: string) => void;
  showErrorMessage: (errorMessage: string) => void;
}> = (props) => {
  const { showErrorMessage, setAuthToken } = props;
  const [id, setId] = useState<string>("");

  const handleError = (err: unknown) => {
    setId("");
    if (err instanceof AxiosError) {
      showErrorMessage(err.response?.data?.error || err.message);
    } else {
      showErrorMessage("Something went wrong");
    }
  };

  const scan = async () => {
    try {
      setId(await getId("rfid"));
    } catch (err) {
      handleError(err);
    }
  };

  const login = async () => {
    try {
      setAuthToken(await getAuthToken(id));
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Scan Your ID Card
      </Typography>
      <TextField
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        helperText="Place your ID card on the reader"
        value={id}
      />
      <Button
        variant="contained"
        sx={{ width: "fit-content", mt: 4 }}
        onClick={id.length === 0 ? scan : login}
      >
        {id.length === 0 ? "Scan" : "Login"}
      </Button>
    </>
  );
};

export default HomePage;
