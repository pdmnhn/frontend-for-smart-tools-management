import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import HomePage from "./Pages/HomePage";
import ReturnPage from "./Pages/tools/ReturnPage";
import TakePage from "./Pages/tools/TakePage";
import ToolsPage from "./Pages/ToolsPage";

const App = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "1",
        height: "100vh",
      }}
    >
      <Paper
        variant="outlined"
        square
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 2,
          background: "#0F53B7",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ color: "white", fontWeight: "bold" }}
        >
          Smart Inventory Tools & Asset Tracking
        </Typography>
      </Paper>
      <Box sx={{ flex: 1, background: "#f5edf7" }}>
        <Router>
          <Routes>
            {authToken === null ? (
              <>
                <Route
                  index
                  element={<HomePage setAuthToken={setAuthToken} />}
                />
                <Route path="*" element={<Navigate replace to="/" />} />
              </>
            ) : (
              <Route path="/">
                <Route index element={<ToolsPage />} />
                <Route path="/take" element={<TakePage />} />
                <Route path="/return" element={<ReturnPage />} />
              </Route>
            )}
          </Routes>
        </Router>
      </Box>
      <Paper
        variant="outlined"
        square
        sx={{ display: "flex", justifyContent: "center", padding: 1 }}
      >
        <Typography
          variant="body1"
          sx={{ color: "#0F316D", fontWeight: "bold" }}
        >
          Developed by Ashwin, Padmanabhan and Kirithana
        </Typography>
      </Paper>
    </Box>
  );
};

export default App;
