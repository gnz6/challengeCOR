import { Box } from "@mui/material";
import { Navbar } from "./ui/Navbar";

interface Props {
  title?: string;
  children?: React.ReactNode;
}

export const Layout = ({ title = "ChallengeCor", children }: Props) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <title>{title}</title>
      <Navbar />

      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
