import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getUserTools } from "../services/api";
import { ToolAttributes } from "../types";
import ToolsTable from "../components/ToolsTable";

const ToolsPage: FC<{ authToken: string }> = ({ authToken }) => {
  const [tools, setTools] = useState<Array<ToolAttributes> | null>(null);
  useEffect(() => {
    const helper = async () => {
      setTools(await getUserTools(authToken));
    };
    helper();
  }, [authToken]);
  return (
    <>
      {tools !== null && tools.length > 0 ? (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Tools Taken
          </Typography>
          <ToolsTable rows={tools} />
        </>
      ) : (
        <Typography variant="h6" sx={{ mb: 2 }}>
          No Tools Taken
        </Typography>
      )}
      <Container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          mt: 4,
        }}
      >
        <Button variant="contained" sx={{ mr: 2 }} component={Link} to="/take">
          Take Tool
        </Button>
        <Button
          variant="contained"
          disabled={tools?.length === 0}
          sx={{ ml: 2 }}
          component={Link}
          to="/return"
        >
          Return Tool
        </Button>
      </Container>
    </>
  );
};

export default ToolsPage;
