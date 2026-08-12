import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import { getApiBaseUrl } from './components/api';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';
import appLogo from '../../../docs/octofitapp-small.png';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <img src={appLogo} alt="OctoFit logo" />
          <div>
            <h1>OctoFit Tracker</h1>
            <p>React 19 presentation tier for teams, activities, and workouts.</p>
          </div>
        </div>
        <p className="api-base">API Base: {getApiBaseUrl()}</p>
      </header>

      <nav className="app-nav">
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
