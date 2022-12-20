import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import HomePage from "./Pages/HomePage";
import ReturnPage from "./Pages/tools/ReturnPage";
import TakePage from "./Pages/tools/TakePage";
import ToolsPage from "./Pages/ToolsPage";
import { Alert } from "@mui/material";

const App = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const showErrorMessage = (errorMessage: string) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    setError(errorMessage);
    setTimeoutId(
      window.setTimeout(() => {
        setError("");
      }, 5000)
    );
  };

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "1",
          height: "100vh",
          background: "#fbe5fd",
        }}
      >
        <Paper
          variant="outlined"
          square
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 2,
            alignItems: "center",
            background: "#002b9f",
          }}
        >
          <Button
            component={Link}
            to="/"
            size="small"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <HomeIcon style={{ color: "white" }} />
            <Typography variant="caption" color="white">
              Home
            </Typography>
          </Button>
          <Typography
            variant="h5"
            component="h1"
            sx={{ color: "white", fontWeight: "bold" }}
          >
            Smart Inventory Tools & Asset Tracking
          </Typography>
          <Button
            size="small"
            sx={{ display: "flex", flexDirection: "column" }}
            onClick={() => {
              setAuthToken(null);
            }}
          >
            <LogoutIcon style={{ color: "white" }} />
            <Typography variant="caption" color="white">
              Logout
            </Typography>
          </Button>
        </Paper>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              alignItems: "center",
              padding: 8,
            }}
          >
            <Routes>
              {authToken === null ? (
                <>
                  <Route
                    index
                    element={
                      <HomePage
                        showErrorMessage={showErrorMessage}
                        setAuthToken={setAuthToken}
                      />
                    }
                  />
                  <Route path="*" element={<Navigate replace to="/" />} />
                </>
              ) : (
                <Route path="/">
                  <Route index element={<ToolsPage authToken={authToken} />} />
                  <Route
                    path="/take"
                    element={
                      <TakePage
                        showErrorMessage={showErrorMessage}
                        authToken={authToken}
                      />
                    }
                  />
                  <Route
                    path="/return"
                    element={
                      <ReturnPage
                        authToken={authToken}
                        showErrorMessage={showErrorMessage}
                      />
                    }
                  />
                </Route>
              )}
            </Routes>
          </Paper>
        </Box>
        {error.length !== 0 && (
          <Alert
            sx={{
              position: "fixed",
              left: "1%",
              bottom: "10%",
              width: "fit-content",
            }}
            onClose={() => {
              setError("");
            }}
            variant="filled"
            severity="error"
          >
            {error}
          </Alert>
        )}
        <Paper
          variant="outlined"
          square
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 1,
            background: "#fbe5fd",
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "#3700B3", fontWeight: "bold" }}
          >
            Frontend Developed by Padmanabhan
          </Typography>
        </Paper>
      </Box>
    </Router>
  );
};

export default App;
