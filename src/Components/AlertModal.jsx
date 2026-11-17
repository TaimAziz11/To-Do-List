import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AlertModal({ open, message }) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} message="Note archived">
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
