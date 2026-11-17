import { useState } from "react";
import AlertModal from "../Components/AlertModal";
import { AlertContext } from "./AlertContext";

export const AlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideAlert(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <AlertContext.Provider value={{ showHideAlert }}>
      <AlertModal open={open} message={message} />
      {children}
    </AlertContext.Provider>
  );
};
