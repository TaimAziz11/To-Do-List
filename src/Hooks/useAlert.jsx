import { useContext } from "react";
import { AlertContext } from "../Contexts/AlertContext";

export const useAlert = () => {
  return useContext(AlertContext);
};
