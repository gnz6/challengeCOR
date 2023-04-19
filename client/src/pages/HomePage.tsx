import { Layout } from "../components/layout/Layout";
import { Button, Grid } from "@mui/material";
import ModalNewTask from "../components/ui/ModalNewTask";
import TaskCard from "../components/ui/TaskCard";
import { TaskList } from "../components/ui/TaskList";

export const HomePage = () => {
  return (
    <Layout>
     
     <Grid container >
      <TaskList/>
     </Grid>
     
     
      <Grid
        container
        spacing={2}
        display={"flex"}
        justifyContent={"flex-end"}
        position={"fixed"}
        bottom={10}
        right={20}
        width={"100vw"}
      >
          <ModalNewTask />
      </Grid>
    </Layout>
  );
};
