export const STATUS_OPTIONS = [
  { value: 'todo', label: 'A faire', tone: 'neutral' },
  { value: 'doing', label: 'En cours', tone: 'warning' },
  { value: 'done', label: 'Termine', tone: 'success' },
];

const legacyMap = {
  todo: 'todo',
  'a faire': 'todo',
  'en attente': 'todo',
  doing: 'doing',
  'in-progress': 'doing',
  'en cours': 'doing',
  done: 'done',
  termine: 'done',
  complete: 'done',
};

export function normalizeStatus(status) {
  const key = String(status || 'todo')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

  return legacyMap[key] || 'todo';
}

export function getStatusMeta(status) {
  const normalized = normalizeStatus(status);
  return STATUS_OPTIONS.find((option) => option.value === normalized) || STATUS_OPTIONS[0];
}
