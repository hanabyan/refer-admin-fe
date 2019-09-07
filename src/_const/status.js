const raw = [
  {
    value: 1,
    label: 'Active',
  },
  {
    value: 7,
    label: 'Inactive',
  },
];

function get(ids = [1, 7]) {
  return raw.filter(item => ids.findIndex(id => id === item.value) > -1);
}

export const STATUS = {
  raw,
  get,
};
