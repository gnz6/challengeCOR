import { useContext, useEffect } from "react";
import { TaskContext } from "../../context/tasks";
import {
  List,
  Grid,
  Typography,
  IconButton,
  TextField,
  Toolbar,
} from "@mui/material";
import TaskCard from "./TaskCard";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

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
  { text: "Any", value: "" },
  { text: "By priority: High", value: "high" },
  { text: "By priority: Medium", value: "medium" },
  { text: "By priority: Low", value: "low" },
  { text: "By Status: New", value: "new" },
  { text: "By Status: In-Process", value: "in-process" },
  { text: "By Status: Completed", value: "completed" },
];

export const TaskList = () => {
  const { tasks, getAllTasks } = useContext(TaskContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const itemsPerPage = () => {
    if (search.length === 0 && !filter) return tasks;
    if (filter === "new" || filter === "in-process" || filter === "completed")
      return tasks.filter(
        (t) => t.status[0].toLowerCase() === filter.toLowerCase()
      );
    if (filter === "high" || filter === "medium" || filter === "low")
      return tasks.filter(
        (t) => t.priority[0].toLowerCase() === filter.toLowerCase()
      );

    let filteredResults = tasks.length
      ? tasks.filter((c) =>
          c.name?.toLowerCase().includes(search?.toLowerCase())
        )
      : tasks;
    return filteredResults;
  };

  console.log(itemsPerPage());

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleChange = ({ target }: SelectChangeEvent) => {
    const { value } = target;
    setFilter(value);
  };

  useEffect(() => {
    getAllTasks();
  }, [itemsPerPage(), search]);

  return (
    <Grid container>
      <Toolbar sx={{ bgcolor: "#111", width: "100%", height: 80, p: 4, mt: 6 }}>
        <FormControl sx={{ m: 1, width: "25%" }}>
          <InputLabel id="demo-multiple-name-label">Filter By:</InputLabel>
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
            sx={{ width: "100%", backgroundColor: "black" }}
            label="Search by Task Name..."
            name="search"
            value={search}
            onChange={handleSearch}
            variant="filled"
          />
        </Grid>
      </Toolbar>

      {!tasks ? (
        <Grid
          container
          sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
        >
          <Typography component={"h1"} variant="h4">
            No tasks registered
          </Typography>
        </Grid>
      ) : (
        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <List
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {itemsPerPage().map(
              ({ name, description, priority, status, _id }) => (
                <TaskCard
                  key={description}
                  name={name}
                  description={description}
                  priority={priority}
                  status={status}
                  _id={_id!}
                />
              )
            )}
          </List>
        </Grid>
      )}
    </Grid>
  );
};
