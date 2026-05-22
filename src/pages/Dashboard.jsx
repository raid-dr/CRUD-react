import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteTask, getTasks, updateTask } from '../api.js';
import TaskCard from '../components/TaskCard.jsx';
import { STATUS_OPTIONS, normalizeStatus } from '../status.js';

const filters = [{ value: 'all', label: 'Toutes' }, ...STATUS_OPTIONS];

function countByStatus(tasks, status) {
  return tasks.filter((task) => normalizeStatus(task.status) === status).length;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadTasks() {
      try {
        const data = await getTasks();
        if (!ignore) {
          setTasks(data);
          setError('');
        }
      } catch (requestError) {
        if (!ignore) {
          setError("Impossible de charger les taches. Lancez d'abord npm run server.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTasks();
    return () => {
      ignore = true;
    };
  }, []);

  const visibleTasks = useMemo(() => {
    const sorted = [...tasks].sort((first, second) => {
      const firstDone = normalizeStatus(first.status) === 'done';
      const secondDone = normalizeStatus(second.status) === 'done';

      if (firstDone !== secondDone) {
        return firstDone ? 1 : -1;
      }

      return String(second.updatedAt || second.createdAt || second.id).localeCompare(
        String(first.updatedAt || first.createdAt || first.id),
      );
    });

    if (activeFilter === 'all') {
      return sorted;
    }

    return sorted.filter((task) => normalizeStatus(task.status) === activeFilter);
  }, [activeFilter, tasks]);

  async function handleDelete(task) {
    const confirmed = window.confirm(`Supprimer "${task.title}" ?`);
    if (!confirmed) {
      return;
    }

    await deleteTask(task.id);
    setTasks((current) => current.filter((item) => item.id !== task.id));
  }

  async function handleStatusChange(task, status) {
    const updatedTask = {
      ...task,
      status,
      updatedAt: new Date().toISOString(),
    };

    const savedTask = await updateTask(task.id, updatedTask);
    setTasks((current) => current.map((item) => (item.id === task.id ? savedTask : item)));
  }

  return (
    <section className="dashboard">
      <header className="page-header">
        <div>
          <p className="eyebrow">Suivi quotidien</p>
          <h2>Tableau des taches</h2>
        </div>
        <Link className="button primary" to="/ajouter">
          Nouvelle tache
        </Link>
      </header>

      <div className="summary-grid" aria-label="Resume des taches">
        <div className="summary-item">
          <span>Total</span>
          <strong>{tasks.length}</strong>
        </div>
        {STATUS_OPTIONS.map((status) => (
          <div className="summary-item" key={status.value}>
            <span>{status.label}</span>
            <strong>{countByStatus(tasks, status.value)}</strong>
          </div>
        ))}
      </div>

      <div className="board-toolbar">
        <div className="filter-tabs" aria-label="Filtrer les taches">
          {filters.map((filter) => (
            <button
              className={activeFilter === filter.value ? 'active' : ''}
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {error ? <p className="notice error">{error}</p> : null}
      {loading ? <p className="notice">Chargement des taches...</p> : null}

      {!loading && !error && visibleTasks.length === 0 ? (
        <div className="empty-state">
          <p>Aucune tache dans cette vue.</p>
          <Link className="button primary" to="/ajouter">
            Ajouter une tache
          </Link>
        </div>
      ) : null}

      <div className="task-list">
        {visibleTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </section>
  );
}
