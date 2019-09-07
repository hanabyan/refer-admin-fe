export function getBusinessWithStatus(state) {
  return state.business.map(item => Object.assign({}, item, {
    status_name: parseInt(item.status, 10) === 1 ? 'Active' : 'Inactive',
  }));
}

export function businessOptions(state) {
  return state.business.map(item => Object.assign({}, {
    value: item.id,
    label: item.name,
  }));
}

export function getProductWithStatus(state) {
  return state.product.map(item => Object.assign({}, item, {
    status_name: parseInt(item.status, 10) === 1 ? 'Active' : 'Inactive',
  }));
}

export function productOptions(state) {
  return state.product.map(item => Object.assign({}, {
    value: item.id,
    label: item.name,
  }));
}
