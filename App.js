import React from "react";
import ReactDOM from "react-dom/client";
import UserData from "./src/components/UserData";
import Data from "./src/components/Data";
const App = () => {
  return (
    <div className="">
      {/* <UserData /> */}
      <Data />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
