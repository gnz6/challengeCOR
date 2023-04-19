import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { MenuItem, Select, TextField, Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { TaskContext } from '../../context/tasks';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Types } from 'mongoose';

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

interface Props{
    _id: Types.ObjectId,
    name: string,
    status: string,
    priority: string
    description?:string
    open: boolean,
    setOpen: (open : boolean) => void
}




export default function EditTaskModal({_id, name, status, priority, description, open, setOpen}: Props) {


  const handleClose = () => {
    setIsAdding(false)
    setOpen(false)
    setTouched(false)
    setInputValue({ name, status, priority, description});
  };


  const { updateTask } = React.useContext(TaskContext);
  const [isAdding, setIsAdding] = React.useState(false);
  const [touched, setTouched] = React.useState(false);


  const [inputValue, setInputValue] = React.useState({
     name, status, priority, description
  });

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue({
      ...inputValue,
      [target.name] : target.value
    });
  };

  const handlePriorityChange = (event : any) => {
    setInputValue({
      ...inputValue,
      priority: event.target.value
    })
  };

  const handleStatusChange = (event : any) => {
    setInputValue({
      ...inputValue,
      status: event.target.value
    })
  };


  const handleCancel=()=> {
    setIsAdding(false)
    setInputValue({ name, status, priority, description});
    handleClose()

  }

  const handleSaveEntry = () => {
    setIsAdding(true);
    const task = {_id, name, status, priority, description}
    console.log(inputValue)
    updateTask( task, inputValue);
    setIsAdding(false);
    setInputValue({ name, status, priority, description});
    handleClose()
  };


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
            <Typography variant='h5'>Edit Task</Typography>
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
          onChange={handlePriorityChange}
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

        
        <Select
          labelId="statusSelect"
          id="status"
          value={inputValue.status}
          label="Priority"
          onChange={handleStatusChange}
          name="status"
          defaultValue={"new"}
          fullWidth
          sx={{
            height:60,
            mb:4
          }}
          
        >
          <MenuItem value={"new"}>New</MenuItem>
          <MenuItem value={"in-process"}>In Process</MenuItem>
          <MenuItem value={"completed"}>Completed</MenuItem>
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