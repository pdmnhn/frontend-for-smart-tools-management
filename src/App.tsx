import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ReturnPage from "./Pages/tools/ReturnPage";
import TakePage from "./Pages/tools/TakePage";
import ToolsPage from "./Pages/ToolsPage";

const App = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  return (
    <Router>
      <Routes>
        {authToken === null ? (
          <>
            <Route
              path="/"
              element={<HomePage setAuthToken={setAuthToken} />}
            />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <Route path="/">
            <Route path="/" element={<ToolsPage />} />
            <Route path="/take" element={<TakePage />} />
            <Route path="/return" element={<ReturnPage />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default App;
