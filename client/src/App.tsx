import { ThemeProvider } from "@emotion/react";
import { TaskProvider } from "./context/tasks";
import { darkTheme, mainTheme } from "./themes";
import {  CssBaseline } from "@mui/material";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <TaskProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <HomePage />
      </ThemeProvider>
    </TaskProvider>
  );
}

export default App;
