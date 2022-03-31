import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Students from './components/Students';
import Welcome from './components/Welcome';
import Attendance from './components/Attendance';

function App() {
  return (
    <ChakraProvider>
      <Navbar/>
      <Routes>
        <Route path="/welcome" element={<Welcome/>} />
        <Route path="/" element={<Dashboard/>} />
        <Route path="/students" element={<Students/>} />
        <Route path="/attendance" element={<Attendance/>} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
