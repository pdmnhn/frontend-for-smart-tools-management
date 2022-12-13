import { FC } from "react";

const ReturnPage: FC<{
  showErrorMessage: (errorMessage: string) => void;
}> = ({ showErrorMessage }) => {
  return <>Return</>;
};

export default ReturnPage;
