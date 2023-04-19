import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { MenuItem, Select, TextField, Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { TaskContext } from '../../context/tasks';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



export default function ModalNewTask() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setIsAdding(true)
    setOpen(true);
  };
  const handleClose = () => {
    setIsAdding(false)
    setOpen(false);
    setTouched(false)
    setInputValue(inputInitialState);
  };


  const { addTask } = React.useContext(TaskContext);
  const [isAdding, setIsAdding] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  
  const inputInitialState ={
    name: "",
    description: "",
    status: "new",
    priority: "high",
  }

  const [inputValue, setInputValue] = React.useState(inputInitialState);

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue({
      ...inputValue,
      [target.name] : target.value
    });
  };

  const handleChange = (event : any) => {
    setInputValue({
      ...inputValue,
      priority: event.target.value
    })
  };


  const handleCancel=()=> {
    setIsAdding(false)
    handleClose()
        setInputValue(inputInitialState);

  }

  const handleSaveEntry = () => {
    if (!inputValue.name.length) return;
    setIsAdding(true);
    addTask(inputValue);
    setIsAdding(false);
    setInputValue(inputInitialState);
    handleClose()
  };


  return (
    <div>
      <Button
          startIcon={<AddCircleOutlinedIcon />}
          variant="outlined"
          fullWidth
          onClick={handleOpen}
          sx={{height:80, fontSize:"large", textTransform:"capitalize"}}
        >
          Add Task
        </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
            <Typography variant='h5'>New Task</Typography>
        <TextField
          fullWidth
          sx={{ marginTop: 2 }}
          autoFocus
          label="Title"
          error={inputValue.name.length <= 1 && touched}
          onChange={handleInputChange}
          value={inputValue.name}
          onBlur={() => setTouched(true)}
          name="name"
          
        />

        <TextField
          fullWidth
          sx={{ marginTop: 1, marginBottom: 1 }}
          multiline
          rows={2}
          label="Description (optional)"
          onChange={handleInputChange}
          value={inputValue.description}
          name="description"
        />

        <Select
          labelId="prioritySelect"
          id="priority"
          value={inputValue.priority}
          label="Priority"
          onChange={handleChange}
          name="priority"
          defaultValue={"high"}
          fullWidth
          sx={{
            height:60,
            mb:4
          }}
          
        >
          <MenuItem value={"high"}>High</MenuItem>
          <MenuItem value={"medium"}>Medium</MenuItem>
          <MenuItem value={"low"}>Low</MenuItem>
        </Select>

        <Box display={"flex"} justifyContent={"space-between"}>
          <Button
            variant="outlined"
            endIcon={<CancelOutlinedIcon />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            endIcon={<CancelOutlinedIcon />}
            onClick={handleSaveEntry}
          >
            Save
          </Button>        
          </Box>
          </Box>
      </Modal>
    </div>
  );
}