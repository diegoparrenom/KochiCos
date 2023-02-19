import React, {  useEffect, useState } from "react";
import { UserProvider } from './context/UserProvider';
import { Navigate, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { NavBar } from './components/NavBar';
import { AlquilerMain } from "./components/Alquiler/AlquilerMain";
import { TrajesMain } from "./components/Trajes/TrajesMain";
import { CalendarMain } from "./components/Calendar/CalendarMain";
import { HourPicker } from "./components/Calendar/HourPicker";
import { EntregaTable } from "./components/Entrega/EntregaTable";
import { DevolucionTable } from "./components/Devolucion/DevolucionTable";

function App() {

  return (
    <UserProvider>
        <NavBar />
        <hr />
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="alquiler" element={   <AlquilerMain/>  }   />
          <Route path="trajes" element={  <TrajesMain/>  }  />
          <Route path="login" element={ <LoginPage /> } />
          <Route path="calendar" element={ <CalendarMain /> } />
          <Route path="hourpicker" element={ <HourPicker /> } />
          <Route path="entregas" element={ <EntregaTable /> } />
          <Route path="devolucion" element={ <DevolucionTable /> } />
          <Route path="/*" element={ <Navigate to="/about" /> } />
        </Routes>
    </UserProvider>
  );
}

export default App;
