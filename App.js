import React from "react";
import ReactDOM from "react-dom/client";
import Data from "./src/components/Data";
import Footer from "./src/components/Footer";
const App = () => {
  return (
    <div className="">
      <Data />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
