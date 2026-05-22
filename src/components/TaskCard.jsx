import { Link } from 'react-router-dom';
import { STATUS_OPTIONS, getStatusMeta, normalizeStatus } from '../status.js';

export default function TaskCard({ task, onDelete, onStatusChange }) {
  const status = getStatusMeta(task.status);

  return (
    <article className="task-card">
      <div className="task-card-top">
        <span className={`status-pill ${status.tone}`}>{status.label}</span>
        <select
          className="status-select"
          aria-label={`Changer le statut de ${task.title}`}
          value={normalizeStatus(task.status)}
          onChange={(event) => onStatusChange(task, event.target.value)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <h2>{task.title}</h2>
      <p>{task.description || 'Aucune description ajoutee.'}</p>

      <div className="task-card-actions">
        <Link className="button compact secondary" to={`/modifier/${task.id}`}>
          Modifier
        </Link>
        <button className="button compact danger" type="button" onClick={() => onDelete(task)}>
          Supprimer
        </button>
      </div>
    </article>
  );
}
