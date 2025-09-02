import React from 'react'
import SideBar from "./components/layout/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import {
  Management,
  Dashboard,
  Daily,
  Settings,
  Transaction,
  Rates
} from "./pages"

const App = () => {

  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/management" element={<Management />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/Setting" element={<Settings />} />
          <Route path="/transaction" element={<Transaction />} />

          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </Router>
  )
}

export default App