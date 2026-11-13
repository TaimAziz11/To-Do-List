//====Material UI====
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

//====Css====
import "../App.css";

//====Use State====
import { useState } from "react";

function TaskModal({ isVisable, onClose, task, mode, onSave }) {
  const [newTask, setNewTask] = useState({
    title: task?.title || "",
    details: task?.details || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newTask);
    setNewTask({
      title: "",
      details: "",
    });
  };

  if (isVisable) {
    return (
      <Container
        maxWidth="sm"
        fixed
        sx={{
          background: "rgba(15, 23, 42, 0.6)",
          padding: "0px !important",
          width: "100vw",
          height: "100vh",
          position: "absolute !important",
          alignContent: "center",
        }}
      >
        <form
          className="form-modal"
          style={{ textAlign: "center" }}
          onSubmit={handleSubmit}
        >
          <div id="modal-title">
            <h1>{mode == "add" ? "Add" : "Edit"} Task</h1>
          </div>
          <hr />
          <div className="modal-inputs">
            <TextField
              id="outlined-basic"
              label="Task Title"
              variant="outlined"
              value={newTask.title}
              onChange={(e) => {
                setNewTask({ ...newTask, title: e.target.value });
              }}
              required
            />
          </div>
          <div className="modal-inputs">
            <TextField
              id="outlined-basic"
              label="Task Details"
              variant="outlined"
              value={newTask.details}
              onChange={(e) => {
                setNewTask({ ...newTask, details: e.target.value });
              }}
            />
          </div>
          <div className="modal-btns">
            <Button
              type="submit"
              id="modal-add-btn"
              variant="contained"
              color="success"
            >
              {mode == "add" ? "Add" : "Edit"}
            </Button>
            <Button
              id="modal-cancel-btn"
              variant="contained"
              color="error"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Container>
    );
  } else {
    return <></>;
  }
}

export default TaskModal;
