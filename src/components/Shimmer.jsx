import React from "react";

const Shimmer = () => {
  const shimmerArray = Array(10).fill(null);

  return (
    <div className="mx-auto px-4 space-y-4 mt-10 ml-4">
      {shimmerArray.map((_, index) => (
        <div key={index} className="flex items-center animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-16 mr-4"></div>
          <div className="h-12 w-12 bg-gray-200 rounded-full mr-16"></div>
          <div className="h-12 bg-gray-200 rounded w-52 mr-10"></div>
          <div className="h-12 bg-gray-200 rounded w-16 mr-24"></div>
          <div className="h-12 bg-gray-200 rounded w-56 mr-4"></div>
          <div className="h-12 bg-gray-200 rounded w-52"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
