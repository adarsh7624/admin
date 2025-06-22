import React, { useEffect, useState } from "react";
import DoctorLayout from "../components/DoctorLayout";
import { BsClock } from "react-icons/bs";
import { MdCalendarToday } from "react-icons/md";
import DoctorCalendar from "../components/DoctorCalendar";
import axios from "axios";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({});
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");

  // Get doctorId from login data
  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    const now = new Date();
    setDateStr(now.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }));

    const updateTime = () => {
      setTimeStr(new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000); // every minute
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorId) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/appointments/doctor/${doctorId}`);
        setAppointments(res.data);

        const grouped = res.data.reduce((acc, cur) => {
          acc[cur.status] = (acc[cur.status] || 0) + 1;
          return acc;
        }, {});

        setStats({
          total: res.data.length,
          video: grouped["Video"] || 0,
          previsit: grouped["PreVisit"] || 0,
          cancelled: grouped["Cancelled"] || 0,
          walkin: grouped["WalkIn"] || 0,
          rescheduled: grouped["Rescheduled"] || 0,
        });
      } catch (err) {
        console.error("❌ Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const statCards = [
    { label: "Today's Appointments", value: stats.total || 0, change: 20 },
    { label: "Video Consult Appointments", value: stats.video || 0, change: 15 },
    { label: "Pre Visit Appointments", value: stats.previsit || 0, change: 15 },
    { label: "Cancelled Appointments", value: stats.cancelled || 0, change: -20 },
    { label: "Walk-in Appointments", value: stats.walkin || 0, change: 25 },
    { label: "Rescheduled Appointments", value: stats.rescheduled || 0, change: 30 },
  ];

  return (
    <DoctorLayout>
      <div className="bg-white p-6 rounded-lg shadow mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Hello, Doctor</h2>
          <p className="text-gray-500">Welcome Back</p>
          <p className="text-sm text-pink-600 mt-1 flex items-center gap-3">
            <MdCalendarToday /> {dateStr} <BsClock /> {timeStr}
          </p>
        </div>
        <img
          src="https://via.placeholder.com/60"
          alt="Doctor"
          className="rounded-full border-2 border-pink-500"
        />
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow text-center">
            <h4 className="text-sm text-gray-500 mb-2">{card.label}</h4>
            <h3 className="text-xl font-bold">{card.value}</h3>
            <p className={`text-sm ${card.change >= 0 ? "text-green-600" : "text-red-600"}`}>
              {card.change >= 0 ? "▲" : "▼"} {Math.abs(card.change)}% from last week
            </p>
          </div>
        ))}
      </div>

      {/* UPCOMING APPOINTMENT */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-lg shadow mb-6">
        <p className="text-sm font-semibold">Upcoming Appointment</p>
        {appointments[0] ? (
          <>
            <h3 className="font-bold text-lg">{appointments[0].patientName}</h3>
            <p className="text-xs">{appointments[0].issue} • {appointments[0].date}</p>
            <div className="mt-3 flex space-x-2">
              <button className="bg-red-500 text-white px-3 py-1 text-sm rounded">Start</button>
              <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded">Chat</button>
              <button className="bg-purple-500 text-white px-3 py-1 text-sm rounded">Video</button>
            </div>
          </>
        ) : <p className="text-sm text-gray-600 mt-2">No upcoming appointments.</p>}
      </div>

      {/* CALENDAR + LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoctorCalendar />
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold">Today's Appointments</h4>
          </div>
          <div className="space-y-3 max-h-[360px] overflow-auto">
            {appointments.length === 0 ? (
              <p className="text-sm text-gray-600">No appointments today.</p>
            ) : (
              appointments.map((a, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center font-bold">
                      {a.patientName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{a.patientName}</p>
                      <p className="text-xs text-gray-500">{a.issue}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded text-white ${
                    a.status === "Start"
                      ? "bg-red-500"
                      : a.status === "In Progress"
                      ? "bg-green-500"
                      : a.status === "Cancelled"
                      ? "bg-gray-500"
                      : "bg-yellow-500"
                  }`}>
                    {a.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;