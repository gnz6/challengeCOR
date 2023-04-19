import { Box } from "@mui/material";
import { Navbar } from "../ui/Navbar";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
};
