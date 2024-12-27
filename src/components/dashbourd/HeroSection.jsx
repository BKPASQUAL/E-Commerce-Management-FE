import React from "react";
import { FaUsers, FaBox, FaDollarSign } from "react-icons/fa"; // Import icons from react-icons

function HeroSection() {
  const stats = [
    { title: "Total Users", value: "20", icon: <FaUsers /> },
    { title: "Total Items", value: "15", icon: <FaBox /> },
    { title: "Total Customers", value: "1214", icon: <FaDollarSign /> },
  ];

  return (
    <div className="flex flex-row flex-wrap justify-center space-x-6 ">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center h-48 w-64 bg-white shadow-sm rounded-lg  hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col items-center">
            <div className="text-blue-500 text-5xl mb-4">{stat.icon}</div>
            <h1 className="text-xl font-semibold text-gray-700">{stat.title}</h1>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HeroSection;
