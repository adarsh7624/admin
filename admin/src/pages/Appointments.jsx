import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`http://localhost:5000/api/appointments/doctor/${doctorId}`);
      setAppointments(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h2 className="text-2xl font-bold mb-6">Your Appointments</h2>
        {appointments.map((a, i) => (
          <div key={i} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-bold">{a.patientName}</h3>
            <p>{a.issue}</p>
            <p>{a.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
