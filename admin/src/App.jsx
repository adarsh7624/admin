import React, { useState } from 'react';
import DoctorDashboard from './pages/DoctorDashboard';
import Login from './pages/Login';

function App() {
  const [doctorId, setDoctorId] = useState(localStorage.getItem('doctorId'));

  return (
    <>
      {!doctorId ? (
        <Login setDoctorId={(id) => {
          localStorage.setItem('doctorId', id);
          setDoctorId(id);
        }} />
      ) : (
        <DoctorDashboard doctorId={doctorId} />
      )}
    </>
  );
}

export default App;