import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import HomePage from "./pages/HomePage";
import DevicesPage from "./pages/DevicesPage";
import RoomsPage from "./pages/RoomsPage";
import AutomationPage from "./pages/AutomationPage";
import EnergyPage from "./pages/EnergyPage";
import LogsPage from "./pages/LogsPage";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="simulator-app">
        <header className="topbar">
          <div className="brand-section">
            <div className="brand-icon">
              ⌂
            </div>

            <div>
              <h1>SMARTNEST</h1>
              <p>Hardware Simulator</p>
            </div>
          </div>

          <div className="cloud-status">
            <span className="green-dot" />
            Firebase Connected
          </div>
        </header>

        <div className="body-layout">
          <Sidebar />

          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
              />

              <Route
                path="/devices"
                element={<DevicesPage />}
              />

              <Route
                path="/rooms"
                element={<RoomsPage />}
              />

              <Route
                path="/automation"
                element={<AutomationPage />}
              />

              <Route
                path="/energy"
                element={<EnergyPage />}
              />

              <Route
                path="/logs"
                element={<LogsPage />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}