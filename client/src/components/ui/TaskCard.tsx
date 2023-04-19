import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, IconButton } from "@mui/material";
import { shortDescription } from "../helpers/ShortDescription";
import { useContext, useState } from "react";
import { TaskContext } from "../../context/tasks";
import { Types } from "mongoose";
import EditTaskModal from "./EditTaskModal";

interface Props {
  name: string;
  description?: string;
  status: string;
  priority: string;
  _id: Types.ObjectId;
}

export default function TaskCard({
  name,
  description,
  status,
  priority,
  _id
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditModal = () => {
    setModalOpen(true);
  };

  const { deleteTask, updateTask, tasks } = useContext(TaskContext);
  const handleDelete = async (id: Types.ObjectId) => {
    console.log({ id });
    deleteTask(id);
  };

  return (
    <>
      {modalOpen ? (
        <EditTaskModal
          _id={_id}
          name={name}
          status={status}
          priority={priority}
          description={description}
          open={modalOpen}
          setOpen={setModalOpen}
        />
      ) : (
        <Box sx={{ width: 275 }}>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: "#000",
              ":hover": { backgroundColor: "#222" },
            }}
          >
            <CardContent>
              <Typography sx={{ color: "#aaa", textTransform: "capitalize" }}>
                {status}
              </Typography>
              <Typography variant="h5" component="div">
                {name?.length >= 5 ? name.slice(0, 5) : name}
                {name}
              </Typography>
              <Typography variant="body2">
                {description && description?.length > 30
                  ? shortDescription(description)
                  : description}
                <br />
              </Typography>
              <Typography
                sx={{ mb: 1.5, textTransform: "capitalize" }}
                color="text.secondary"
              >
                Priority: {priority}
              </Typography>
            </CardContent>

            <Grid
              container
              gap={3}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Grid>
                <IconButton
                  sx={{ ":hover": { color: "orange" }, border:"1px solid white" }}
                  onClick={(handleEditModal)}
                >
                  <EditIcon />
                </IconButton>
              </Grid>
              <Grid>
                <IconButton
                  sx={{ ":hover": { color: "red" } }}
                  onClick={() => handleDelete(_id)}
                >
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Card>
        </Box>
      )}
    </>
  );
}

{
  /* <EditTaskModal _id={_id} name={name} status={status} priority={priority} description={description}/> */
}
