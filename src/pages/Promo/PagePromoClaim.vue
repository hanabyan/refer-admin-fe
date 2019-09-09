<template>
  <div class="q-pa-md">
    <q-table
      :data="claims"
      :columns="columns"
      row-key="client_id"
    >
    </q-table>
  </div>
</template>

<script>
export default {
  // name: 'PageName',
  data() {
    return {
      claims: [],
      columns: [
        {
          name: 'date',
          label: 'Date',
          field: 'date',
          sortable: true,
          align: 'left',
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          sortable: true,
          align: 'left',
        },
      ],
    };
  },
};
</script>

<style>
</style>
