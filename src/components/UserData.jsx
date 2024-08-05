import { useState, useEffect } from "react";
import { USERS_API_URL } from "../../constants";
import DehazeOutlinedIcon from "@mui/icons-material/DehazeOutlined";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import logo from "../assets/logo.png";

const Data = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      ) {
        return;
      }
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  async function getUsers(page) {
    setLoading(true);
    const response = await fetch(
      `${USERS_API_URL}?limit=10&skip=${(page - 1) * 10}`
    );
    const json = await response.json();

    setUsers((prevUsers) => [...prevUsers, ...json.users]);
    setLoading(true);
  }

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
            <select className="border border-gray-300 p-2 rounded">
              <option value="">Country</option>
              <option value="USA">USA</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <select className="border border-gray-300 p-2 rounded">
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
              <button>
                <SwapVertOutlinedIcon />
              </button>
            </th>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">
              Full Name
              <button>
                <SwapVertOutlinedIcon />
              </button>
            </th>
            <th className="px-4 py-2 text-left flex">
              Demography
              <button>
                <SwapVertOutlinedIcon />
              </button>
            </th>
            <th className="px-4 py-2 text-left">Designation</th>
            <th className="px-4 py-2 text-left">Location</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
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
      {loading && <p className="text-center py-4">Loading...</p>}
    </div>
  );
};

export default Data;
