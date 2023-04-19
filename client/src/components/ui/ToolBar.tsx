import { Grid, TextField, Toolbar } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

export const ToolBar = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const filters = [
    { text: "By priority: High", value: "high" },
    { text: "By priority: Medium", value: "medium" },
    { text: "By priority: Low", value: "low" },
    { text: "By Status: New", value: "new" },
    { text: "By Status: In-Process", value: "in-process" },
    { text: "By Status: Completed", value: "completed" },
  ];

  const [filter, setFilter] = useState("");

  const handleChange = (event: SelectChangeEvent<typeof filter>) => {
    const {
      target: { value },
    } = event;
    setFilter(typeof value === "string" ? value : "");
  };

  return (
    <Toolbar sx={{ bgcolor: "#333", width: "100%", height: 80, p: 4, mt: 6 }}>
      <FormControl sx={{ m: 1, width: "25%" }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={filter}
          onChange={handleChange}
          input={<OutlinedInput label="Filter" />}
          MenuProps={MenuProps}
          label="Select Filter"
        >
          {filters.map(({ text, value }) => (
            <MenuItem key={value} value={value}>
              {text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container width={"75%"}>
        <TextField 
        sx={{width:"100%"}}
        label="Search by Task Name..."
        />
      </Grid>
    </Toolbar>
  );
};
