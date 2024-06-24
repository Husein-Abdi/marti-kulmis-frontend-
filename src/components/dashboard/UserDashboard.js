import React from "react";
import Halls from "../halls/Halls";

const UserDashboard = () => {
  return (
    <>
      <div className="min-h-screen mt-6">
        <h1 className="ml-3 text-xl font-black leading-7 text-center text-gray-800 sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl md:leading-10">
          User <span className="text-indigo-700">Dashboard</span>{" "}
        </h1>

        <div >
          <Halls />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
