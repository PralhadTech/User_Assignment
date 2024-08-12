import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Footer from "./src/components/Footer";
import Header from "./src/components/Header";
import Shimmer from "./src/components/Shimmer";

const LazyData = lazy(() => import("./src/components/Data"));

const App = () => {
  return (
    <div className="container m-auto">
      <Header />
      <Suspense fallback={<Shimmer />}>
        <LazyData />
      </Suspense>
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
