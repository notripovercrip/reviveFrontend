import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./features/components/Registration";
import HomePage from "./features/pages/Homepage";
import HtmlScanner from "./features/components/Scanner";
import Login from "./features/components/Login";
import ParticipantsTable from "./features/components/ParticipantTable";
import EntriesTable from "./features/components/EntryTable";
import Protected from "./features/components/Protected";
import Navbar from "./features/components/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/scanner"
            element={
              <Protected>
                <Navbar />
                <HtmlScanner />
              </Protected>
            }
          />
          <Route
            path="/records"
            element={
              <Protected>
                <Navbar />
                <ParticipantsTable />
              </Protected>
            }
          />
          <Route
            path="/entries"
            element={
              <Protected>
                <Navbar />
                <EntriesTable />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
