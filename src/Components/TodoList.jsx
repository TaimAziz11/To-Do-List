// ====MATERIAL UI====
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

//====MATERIAL ICONS====
import IconButton from "@mui/material/IconButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";

//====CSS====
import "../App.css";

//====components====
import TaskModal from "./TaskModal";
import Task from "./Task";

//====Use State / Use Memo====
import { useState, useMemo } from "react";

//====Context====
import { useTasks } from "../Hooks/useTasks";
import { useAlert } from "../Hooks/useAlert";

//====UUID====
import { v4 as id } from "uuid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";


export default function TodoList() {
  const { tasks, setTasks } = useTasks();
  const { showHideAlert } = useAlert();
  const [modalMode, setModalMode] = useState("add");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [displayedTasksType, setDisplayedTasksType] = useState("all");

  function changeDisplayedType(e) {
    setDisplayedTasksType(e.target.value);
  }

  const handleSaveTask = (taskData) => {
    if (modalMode == "add") {
      setTasks((prev) => [
        ...prev,
        {
          id: id(),
          title: taskData.title,
          details: taskData.details,
          isCompleted: false,
        },
      ]);
      showHideAlert("The Task was added successfully...");
    } else {
      setTasks((prev) =>
        prev.map((task) =>
          task.id == selectedTask.id ? { ...task, ...taskData } : task,
        ),
      );
      showHideAlert("The Task was updated successfully...");
    }
    setShowModal(false);
    setSelectedTask(null);
  };

  // filteration arrays
  const completedTasks = useMemo(() => {
    return tasks.filter((t) => {
      return t.isCompleted;
    });
  }, [tasks]);

  const notCompletedTasks = useMemo(() => {
    return tasks.filter((t) => {
      return !t.isCompleted;
    });
  }, [tasks]);

  let tasksToBeRendered = tasks;

  if (displayedTasksType == "completed") {
    tasksToBeRendered = completedTasks;
  } else if (displayedTasksType == "non-completed") {
    tasksToBeRendered = notCompletedTasks;
  }

  const tasksJsx = tasksToBeRendered.map((t) => {
    return (
      <Task
        key={t.id}
        task={t}
        onEdit={() => {
          setModalMode("edit");
          setSelectedTask(t);
          setShowModal(true);
        }}
      />
    );
  });

  return (
    <>
      <Container maxWidth="sm" fixed>
        <Card
          sx={{
            minWidth: 275,
            padding: "0px 5px",
            textAlign: "center",
            bgcolor: "#ffffff",
          }}
        >
          <CardContent sx={{ paddingBottom: "0px" }}>
            <Typography
              variant="h4"
              sx={{
                marginBottom: "0px",
                color: "#1e293b",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
              }}
              gutterBottom
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <AssignmentTurnedInOutlinedIcon
                  fontSize="large"
                  sx={{ color: "#2563eb" }}
                />
                <span style={{ fontWeight: "normal !important" }}>|</span>
                <strong>My Tasks</strong>
              </Stack>

              <IconButton color="primary" Size="large">
                <AddCircleRoundedIcon
                  fontSize="large"
                  onClick={() => {
                    setSelectedTask(null);
                    setModalMode("add");
                    setShowModal(true);
                  }}
                />
              </IconButton>
            </Typography>

            <hr />
            {/* ======FILTER BUTTONS====== */}
            <Stack spacing={2}>
              <ToggleButtonGroup
                direction="row"
                value={displayedTasksType}
                onChange={changeDisplayedType}
                exclusive
                sx={{
                  justifyContent: "center",
                  marginBottom: "5px",
                  gap: 1,
                  "& .MuiToggleButton-root": {
                    backgroundColor: "primary.main",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    textTransform: "none",

                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },

                    "&.Mui-selected": {
                      backgroundColor: "secondary.main",
                      color: "white",
                    },

                    "&.Mui-selected:hover": {
                      backgroundColor: "secondary.dark",
                    },
                  },
                }}
              >
                <ToggleButton value="completed">Completed</ToggleButton>
                <ToggleButton value="non-completed">Non Completed</ToggleButton>
                <ToggleButton value="all">All</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            {/* ======FILTER BUTTONS====== */}

            {/* =====ALL TASKS===== */}
            <div className="tasks">{tasksJsx}</div>
            {/* =====ALL TASKS===== */}
          </CardContent>
        </Card>
      </Container>

      <TaskModal
        key={`${modalMode}-${selectedTask?.id ?? "new"}`}
        isVisable={showModal}
        onClose={() => setShowModal(false)}
        task={selectedTask}
        mode={modalMode}
        onSave={handleSaveTask}
      />
    </>
  );
}
