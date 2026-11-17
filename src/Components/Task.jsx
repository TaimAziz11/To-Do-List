// ====MATERIAL UI====
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

//====DIALOG MATERIAL UI====
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

//====MATERIAL ICONS====
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

//====USE STATE====
import { useState } from "react";

//====CSS====
import "../App.css";

//====Context====
import { useTasks } from "../Hooks/useTasks";
import { useAlert } from "../Hooks/useAlert";

export default function Task({ task, onEdit }) {
  const { tasks, setTasks } = useTasks();
  const { showHideAlert } = useAlert();
  const [openDetails, setOpenDetails] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // EVENT HANDLERS
  const handleClickOpenDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirm = () => {
    const taskDelete = tasks.filter((t) => {
      return t.id != task.id;
    });
    setTasks(taskDelete);
    showHideAlert("The Task was deleted successfully...");
  };

  const handleClick = () => {
    setOpenDetails((prev) => !prev);
  };

  function handleCheckClick() {
    const taskCheck = tasks.map((t) => {
      if (t.id == task.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTasks(taskCheck);
    if (!task.isCompleted) {
      showHideAlert("The Task was unChecked successfully...");
    } else {
      showHideAlert("The Task was checked successfully...");
    }
  }
  // ====EVENT HANDLERS====

  return (
    <>
      {/* DELETE MODAL */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Task:"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure for delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteConfirm}
          >
            Yes, Sure
          </Button>
        </DialogActions>
      </Dialog>
      {/* ====DELETE MODAL==== */}
      <Card
        className="task"
        sx={{
          marginTop: "15px",
          padding: "0px",
          backgroundColor: "#cfd8dc",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        <CardContent sx={{ paddingBottom: "16px !important" }}>
          <Grid container spacing={2}>
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={1}>
                <IconButton
                  className="icon-button"
                  color="error"
                  onClick={handleClickOpenDialog}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  className="icon-button"
                  color="primary"
                  onClick={onEdit}
                >
                  <EditRoundedIcon />
                </IconButton>
                <IconButton className="icon-button" color="success">
                  {/* Task Completed Or Not */}
                  {task.isCompleted ? (
                    <CheckBoxRoundedIcon
                      onClick={() => {
                        handleCheckClick();
                      }}
                    />
                  ) : (
                    <CheckBoxOutlineBlankIcon
                      onClick={() => {
                        handleCheckClick();
                      }}
                    />
                  )}
                  {/* ====Task Completed Or Not==== */}
                </IconButton>
              </Stack>
            </Grid>
            <Grid size={8} onClick={handleClick}>
              <Typography
                variant="h5"
                sx={{
                  marginBottom: "0px",
                  color: "#0f172a",
                  textAlign: "right",
                }}
                gutterBottom
              >
                {task.title}
              </Typography>
            </Grid>
            {openDetails && task.details?.trim() ? (
              <Box
                sx={{ textAlign: "right", width: "100%", whiteSpace: "normal" }}
              >
                {task.details}
              </Box>
            ) : null}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
