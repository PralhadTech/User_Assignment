import React from "react";
import logo from "../assets/logo.png";
import { DehazeOutlined, Search } from "@mui/icons-material";

const Header = () => {
  return (
    <div className="container mx-auto px-4 mt-2 border justify-between flex">
      <img src={logo} alt="" className=" h-16" />
      <div className="flex h-8   gap-2 m-auto">
        <input
          type="text"
          placeholder="Search here..."
          className=" border-gray-400 border rounded p-2"
        />
        <button className="border rounded bg-green-300 text-white w-20">
          Search
        </button>
      </div>
      <button>
        <DehazeOutlined />
      </button>
    </div>
  );
};

export default Header;
