import { useState, useEffect } from "react";
import DehazeOutlinedIcon from "@mui/icons-material/DehazeOutlined";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import logo from "../assets/logo.png";

const Data = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [genderFilter, setGenderFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const response = await fetch("https://dummyjson.com/users");
    const json = await response.json();
    const userList = json.users;
    setUsers(userList);
    setFilteredUsers(userList); // Initialize filteredUsers with userList
  }

  // Sorting users based on given column
  function sortUsers(criterion) {
    let sortedUsers;

    switch (criterion) {
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

  // Filter users based on gender and country
  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesGender = genderFilter
        ? user.gender.toLowerCase() === genderFilter.toLowerCase()
        : true;
      const matchesCountry = countryFilter
        ? user.address.country.toLowerCase() === countryFilter.toLowerCase()
        : true;
      return matchesGender && matchesCountry;
    });

    setFilteredUsers(filtered);
  }, [genderFilter, countryFilter, users]);

  return (
    <div className="container mx-auto px-4 border mt-2">
      <div className="flex justify-between items-center my-4">
        <img src={logo} className="h-16" alt="logo" />
        <button>
          <DehazeOutlinedIcon />
        </button>
      </div>

      <div className="flex text-xl justify-between font-bold mb-4 items-center">
        <h1 className="text-2xl font-bold">Employees</h1>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <FilterAltIcon className="text-red-600" />
            <select
              className="border border-gray-300 p-2 rounded text-sm font-normal"
              onChange={(e) => setCountryFilter(e.target.value)}
              value={countryFilter}
            >
              <option value="">Country</option>
              <option value="USA">USA</option>
              <option value="Other">Other</option>
              {/* Add more countries as needed */}
            </select>
          </div>
          <select
            className="border border-gray-300 p-2 rounded text-sm font-normal"
            onChange={(e) => setGenderFilter(e.target.value)}
            value={genderFilter}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 flex text-left">
              ID
              <button onClick={() => sortUsers("id")}>
                <SwapVertOutlinedIcon />
              </button>
            </th>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">
              Full Name
              <button onClick={() => sortUsers("name")}>
                <SwapVertOutlinedIcon />
              </button>
            </th>
            <th className="px-4 py-2 text-left flex">
              Demography
              <button onClick={() => sortUsers("age")}>
                <SwapVertOutlinedIcon />
              </button>
            </th>
            <th className="px-4 py-2 text-left">Designation</th>
            <th className="px-4 py-2 text-left">Location</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">
                <img
                  src={user.image}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="px-4 py-2">
                {user.firstName} {user.maidenName} {user.lastName}
              </td>
              <td className="px-4 py-2">
                {user.gender[0].toUpperCase()}/{user.age}
              </td>
              <td className="px-4 py-2">{user.company.title}</td>
              <td className="px-4 py-2">
                {user.address.state}, {user.address.country}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data;
