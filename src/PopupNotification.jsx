import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { hidePopup } from "./redux/slices/authSlice"; // Adjust the import as needed

const PopupNotification = () => {
  const dispatch = useDispatch();
  const { popupMessage, popupOpen } = useSelector((state) => state.auth);

  const handleClose = () => {
    dispatch(hidePopup());
  };

  return (
    <Snackbar
      open={popupOpen}
      autoHideDuration={6000} // The duration before the popup automatically closes
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={popupMessage.includes("error") ? "error" : "success"}
        sx={{ width: "100%" }}
      >
        {popupMessage}
      </Alert>
    </Snackbar>
  );
};

export default PopupNotification;
