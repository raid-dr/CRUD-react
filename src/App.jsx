import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import TaskEditor from './pages/TaskEditor.jsx';

function AppShell({ children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Navigation principale">
        <div className="brand-block">
          <span className="brand-mark">TF</span>
          <div>
            <p className="eyebrow">TaskFlow</p>
            <h1>Gestion des taches</h1>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" end>
            Tableau
          </NavLink>
          <NavLink to="/ajouter">Nouvelle tache</NavLink>
        </nav>
      </aside>

      <main className="workspace">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ajouter" element={<TaskEditor mode="create" />} />
        <Route path="/modifier/:id" element={<TaskEditor mode="edit" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
