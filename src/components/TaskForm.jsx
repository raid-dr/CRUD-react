import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { STATUS_OPTIONS, normalizeStatus } from '../status.js';

const emptyTask = {
  title: '',
  description: '',
  status: 'todo',
};

export default function TaskForm({ initialTask, mode, onSubmit, submitting }) {
  const [form, setForm] = useState(emptyTask);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!initialTask) {
      setForm(emptyTask);
      return;
    }

    setForm({
      title: initialTask.title || '',
      description: initialTask.description || '',
      status: normalizeStatus(initialTask.status),
    });
  }, [initialTask]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError('Le titre est obligatoire.');
      return;
    }

    setError('');
    await onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Titre</span>
          <input
            autoFocus
            name="title"
            value={form.title}
            onChange={updateField}
            placeholder="Ex: preparer la presentation"
          />
        </label>

        <label>
          <span>Statut</span>
          <select name="status" value={form.status} onChange={updateField}>
            {STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        <span>Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={updateField}
          placeholder="Details, contexte ou prochaine action"
          rows="8"
        />
      </label>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="form-actions">
        <Link className="button secondary" to="/">
          Annuler
        </Link>
        <button className="button primary" type="submit" disabled={submitting}>
          {submitting
            ? 'Enregistrement...'
            : mode === 'edit'
              ? 'Mettre a jour'
              : 'Creer la tache'}
        </button>
      </div>
    </form>
  );
}
