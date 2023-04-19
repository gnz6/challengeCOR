import {
  AppBar,
  Button,
  Grid,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ToolBar } from "./ToolBar";

export const Navbar = () => {
  return (
    <AppBar
      sx={{ height: 50, display: "fixed", alignItems: "center", width: "100%" }}
    >
      <Grid container sx={{ p: 1 }}>
        <Typography component={"h1"} variant="h5" color={"white"}>
          TaskApp
        </Typography>
      </Grid>
    </AppBar>
  );
};
