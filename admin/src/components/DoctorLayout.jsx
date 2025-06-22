import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdEventNote, MdSettings } from "react-icons/md";

const DoctorLayout = ({ children }) => {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Dashboard", icon: <MdDashboard />, path: "/" },
    { label: "Appointments", icon: <MdEventNote />, path: "/appointments" },
    { label: "Settings", icon: <MdSettings />, path: "/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 fixed top-0 left-0 h-full z-10">
        <div className="text-2xl font-bold mb-10 text-center text-blue-600">
          TeleMed
        </div>
        <ul className="space-y-4 text-gray-700">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                  pathname === item.path
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content area with left margin to accommodate sidebar */}
      <main className="ml-64 w-full p-6">{children}</main>
    </div>
  );
};

export default DoctorLayout;
