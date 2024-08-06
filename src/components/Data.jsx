import { useState, useEffect } from "react";
import DehazeOutlinedIcon from "@mui/icons-material/DehazeOutlined";
import logo from "../assets/logo.png";
import { FilterAltOutlined, SwapVertOutlined } from "@mui/icons-material";
import Table from "./UserTable";
import UserTable from "./UserTable";

const Data = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [genderFilter, setGenderFilter] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await fetch(`https://dummyjson.com/users`);
      const json = await response.json();
      setUsers(json.users);
      setFilteredUsers(json.users);
    } catch (error) {
      console.log(error);
    }
  }

  // filters
  const handleChange = (e) => {
    setGenderFilter(e.target.value);
    filterByGender(e.target.value);
  };

  function filterByGender(gender) {
    if (gender) {
      const filtered = users.filter((user) => user.gender === gender);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }

  // sorting
  function sortUsers(column) {
    let sortedUsers;

    switch (column) {
      case "id":
        sortedUsers = [...filteredUsers].sort((a, b) => b.id - a.id);
        break;
      case "name":
        sortedUsers = [...filteredUsers].sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
        break;
      case "age":
        sortedUsers = [...filteredUsers].sort((a, b) => a.age - b.age);
        break;
      default:
        return;
    }
    setFilteredUsers(sortedUsers);
  }

  return (
    <div className="container mx-auto px-4 border mt-2">
      <div className="flex justify-between items-center my-4">
        <img src={logo} className="h-16" alt="logo" />
        <button>
          <DehazeOutlinedIcon />
        </button>
      </div>

      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Employees</h1>
        <div className="flex items-center space-x-2">
          <FilterAltOutlined className="text-red-700" />
          <select className="border border-gray-300 p-2 rounded text-sm font-normal">
            <option value="">Country</option>
            <option value="USA">USA</option>
            <option value="Other">Other</option>
          </select>
          <select
            className="border border-gray-300 p-2 rounded text-sm font-normal"
            onChange={handleChange}
            value={genderFilter}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <UserTable userData={filteredUsers} sortUsers={sortUsers} />
    </div>
  );
};

export default Data;
