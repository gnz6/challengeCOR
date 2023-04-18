import React from "react";
import { ThemeProvider } from "@emotion/react";
import { TaskProvider } from "./context/tasks";
import { darkTheme } from "./themes";
import { CssBaseline } from "@mui/material";

interface Props {
  children?: React.ReactNode;
}

function App({ children }: Props) {
  return (
    <TaskProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </TaskProvider>
  );
}

export default App;
