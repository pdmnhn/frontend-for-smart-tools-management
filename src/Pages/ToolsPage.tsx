import { FC, useEffect, useState } from "react";
import { getUserTools } from "../services/api";
import { ToolsAttributes } from "../types";

const ToolsPage: FC<{ authToken: string }> = ({ authToken }) => {
  const [tools, setTools] = useState<Array<ToolsAttributes> | null>(null);
  useEffect(() => {
    const helper = async () => {
      setTools(await getUserTools(authToken));
    };
    helper();
  }, [authToken]);
  return <>{tools !== null && JSON.stringify(tools)}</>;
};

export default ToolsPage;
