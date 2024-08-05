import React from "react";

const Shimmer = () => {
  return (
    <div className="container mx-auto px-4">
      <tr className="border-b animate-pulse">
        <td className="py-2">
          <div className="h-12 bg-gray-200 rounded w-16"></div>
        </td>
        <td className="px-20 py-2">
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
        </td>
        <td className="px-2 py-2">
          <div className="h-12 bg-gray-200 rounded w-52"></div>
        </td>
        <td className="px-10 py-2">
          <div className="h-12 bg-gray-200 rounded w-16"></div>
        </td>
        <td className="px-24 py-2">
          <div className="h-12 bg-gray-200 rounded w-56"></div>
        </td>
        <td className="px-4 py-2">
          <div className="h-12 bg-gray-200 rounded w-52"></div>
        </td>
      </tr>
    </div>
  );
};

export default Shimmer;
