import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, getTask, updateTask } from '../api.js';
import TaskForm from '../components/TaskForm.jsx';

export default function TaskEditor({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === 'edit';
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) {
      return;
    }

    let ignore = false;

    async function loadTask() {
      try {
        const data = await getTask(id);
        if (!ignore) {
          setTask(data);
          setError('');
        }
      } catch (requestError) {
        if (!ignore) {
          setError('Tache introuvable ou API indisponible.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTask();
    return () => {
      ignore = true;
    };
  }, [id, isEdit]);

  async function handleSubmit(formTask) {
    setSubmitting(true);
    try {
      const timestamp = new Date().toISOString();

      if (isEdit) {
        await updateTask(id, {
          ...task,
          ...formTask,
          updatedAt: timestamp,
        });
      } else {
        await createTask({
          ...formTask,
          createdAt: timestamp,
          updatedAt: timestamp,
        });
      }

      navigate('/');
    } catch (requestError) {
      setError("Enregistrement impossible. Verifiez que l'API est lancee.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="editor-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{isEdit ? 'Modification' : 'Creation'}</p>
          <h2>{isEdit ? 'Modifier une tache' : 'Ajouter une tache'}</h2>
        </div>
      </header>

      {loading ? <p className="notice">Chargement de la tache...</p> : null}
      {error ? <p className="notice error">{error}</p> : null}

      {!loading && (!isEdit || task) ? (
        <TaskForm
          initialTask={task}
          mode={mode}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      ) : null}
    </section>
  );
}
