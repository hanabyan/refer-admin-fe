// TODO: create master business category inject to getter bellow

// const businessCategory = [
//   {
//     id: 1,
//     name: 'Packaged Food Producer',
//   },
//   {
//     id: 2,
//     name: 'Drink Producer',
//   },
// ];

// export function clients(state) {
//   return state.list.map(client => Object.assign({}, client, {
//     business_category_name: businessCategory
//       .find(item => item.id === parseInt(client.business_category_id, 10)).name,
//   }));
// }

export function clientOptions(state) {
  return state.list.map(item => Object.assign({}, {
    value: item.id,
    label: item.company_name,
  }));
}
