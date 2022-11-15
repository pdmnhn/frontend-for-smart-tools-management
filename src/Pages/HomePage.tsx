import { FC, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getId } from "../services/localServer";
import { AxiosError } from "axios";

const HomePage: FC<{
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
  const { setError, setAuthToken } = props;
  const [id, setId] = useState<string>("");

  const scan = async () => {
    try {
      setId(await getId("rfid"));
    } catch (err) {
      setId("");
      if (err instanceof AxiosError) {
        setError(err.message);
      } else {
        setError("Something gone wrong");
      }
    }
  };

  const login = () => {
    setId("");
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Scan your ID card
      </Typography>
      <TextField
        variant="outlined"
        disabled
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
