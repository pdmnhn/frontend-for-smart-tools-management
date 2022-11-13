import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import HomePage from "./Pages/HomePage";
import ReturnPage from "./Pages/tools/ReturnPage";
import TakePage from "./Pages/tools/TakePage";
import ToolsPage from "./Pages/ToolsPage";

const App = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            backgroundColor: "#FEFEFE",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            component="h1"
            sx={{ color: "black", fontWeight: "bold" }}
          >
            Smart Inventory Tools & Asset Tracking
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Routes>
          {authToken === null ? (
            <>
              <Route index element={<HomePage setAuthToken={setAuthToken} />} />
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
    </>
  );
};

export default App;
