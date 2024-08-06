import { SwapVertOutlined } from "@mui/icons-material";

const UserTable = ({ userData, sortUsers }) => {
  return (
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
        {userData.map((user) => (
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
      </tbody>
    </table>
  );
};

export default UserTable;
