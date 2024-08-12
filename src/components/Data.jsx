import React, { useState, useEffect } from "react";
import { FilterAltOutlined, SwapVertOutlined } from "@mui/icons-material";
import Shimmer from "./Shimmer";

const Data = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [genderFilter, setGenderFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getUsers(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !isLoading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  async function getUsers(page) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/users?limit=10&skip=${(page - 1) * 10}`
      );
      const json = await response.json();
      const userList = json.users;
      if (userList.length === 0) {
        setHasMore(false);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...userList]);
        setFilteredUsers((prevUsers) => [...prevUsers, ...userList]);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  function filterUsers(gender, country) {
    let filtered = users;
    if (gender) {
      filtered = filtered.filter((user) => user.gender === gender);
    }
    if (country) {
      filtered = filtered.filter((user) => user.address.country === country);
    }
    setFilteredUsers(filtered);
  }

  const handleGenderChange = (e) => {
    setGenderFilter(e.target.value);
    filterUsers(e.target.value, countryFilter);
  };

  const handleCountryChange = (e) => {
    setCountryFilter(e.target.value);
    filterUsers(genderFilter, e.target.value);
  };

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
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Employees</h1>
        <div className="flex items-center space-x-2">
          <FilterAltOutlined className="text-red-700" />
          <select
            className="border border-gray-300 p-2 rounded text-sm font-normal"
            onChange={handleCountryChange}
            value={countryFilter}
          >
            <option value="">Country</option>
            <option value="United States">USA</option>
            <option value="Other">Other</option>
          </select>
          <select
            className="border border-gray-300 p-2 rounded text-sm font-normal"
            onChange={handleGenderChange}
            value={genderFilter}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left">
              ID
              <button onClick={() => sortUsers("id")}>
                <SwapVertOutlined />
              </button>
            </th>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">
              Full Name
              <button onClick={() => sortUsers("name")}>
                <SwapVertOutlined />
              </button>
            </th>
            <th className="px-4 py-2 text-left">
              Demography
              <button onClick={() => sortUsers("age")}>
                <SwapVertOutlined />
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
                {user.address.state},{" "}
                {user.address.country === "United States"
                  ? "USA"
                  : user.address.country}
              </td>
            </tr>
          ))}
          {isLoading && (
            <tr>
              <td colSpan="6">
                <Shimmer />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Data;
