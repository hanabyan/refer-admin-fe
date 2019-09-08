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

const rawUserStep = [
  {
    value: 0,
    label: 'Unverified',
  },
  {
    value: 1,
    label: 'Verified',
  },
];

function get(ids = [1, 7]) {
  return raw.filter(item => ids.findIndex(id => id === item.value) > -1);
}

function getUserStep(ids = [0, 1]) {
  return rawUserStep.filter(item => ids.findIndex(id => id === item.value) > -1);
}

export const STATUS = {
  raw,
  get,
  getUserStep,
};
