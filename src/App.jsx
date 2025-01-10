import React from "react";
import PopupNotification from "./PopupNotification"; // Adjust the import as needed
import AllRoute from "./routes/AllRoute"; // Adjust the import based on your file structure
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <AllRoute />
      <PopupNotification />
    </>
  );
};

export default App;
