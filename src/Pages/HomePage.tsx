import { FC } from "react";

const HomePage: FC<{
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ setAuthToken }) => {
  return <>Home</>;
};

export default HomePage;
