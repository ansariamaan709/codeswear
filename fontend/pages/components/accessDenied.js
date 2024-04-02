import React from "react";

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-red-600 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-700">
          Sorry, you do not have permission to access this page.
        </p>
        <p className="text-gray-700">
          Please contact the administrator for assistance.
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;
