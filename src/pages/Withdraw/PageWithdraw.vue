<template>
  <div class="q-pa-md">
    <q-table
      :data="withdrawalList"
      :columns="columns"
      row-key="client_id"
    >

      <template v-slot:top>
          <div class="text-h6">Withdrawal</div>
          <q-space/>
      </template>

      <template v-slot:body="props">
        <q-tr
          :props="props"
          @click.native="onRowClick(props.row)"
          class="cursor-pointer"
        >
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>

    </q-table>

    <FormModal
      v-if="isShowForm"
      :isOpen="isShowForm"
      :actionType="actionType"
      :formDataObj="{...formDataObj}"
      @toggle="toggleModal"
      @refetch="fetchWithdrawal"
    />
  </div>
</template>

<script>
import { withdrawalService } from '../../_services';

import FormModal from './FormModal';

export default {
  // name: 'PageName',
  components: {
    FormModal,
  },
  beforeMount() {
    this.fetchWithdrawal();
  },
  data() {
    return {
      isShowForm: false,
      actionType: '',
      formDataObj: {
      },
      withdrawalList: [],
      columns: [
        {
          name: 'user_req_date',
          label: 'Requested Date',
          field: 'user_req_date',
          sortable: true,
          align: 'left',
        },
        {
          name: 'user_name',
          label: 'User Name',
          field: 'user_name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'user_phone',
          label: 'User Phone',
          field: 'user_phone',
          sortable: true,
          align: 'left',
        },
        {
          name: 'user_req_nominal',
          label: 'Amount',
          field: 'user_req_nominal',
          sortable: true,
          align: 'left',
        },
        {
          name: 'status_name',
          label: 'Status',
          field: 'status_name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'admin_name',
          label: 'Approved By',
          field: 'admin_name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'admin_app_date',
          label: 'Approval Date',
          field: 'admin_app_date',
          sortable: true,
          align: 'left',
        },
      ],
    };
  },
  methods: {
    fetchWithdrawal() {
      withdrawalService.get().then((res) => {
        this.withdrawalList = res;
      }, (rej) => {
        console.log(rej);
      });
    },
    onRowClick(row) {
      this.actionType = 'edit';
      const data = { ...row };

      Object.assign(data, {
        status: { value: parseInt(row.status, 10), label: row.status_name },
        note: row.admin_app_note,
      });

      this.formDataObj = data;

      this.toggleModal();
    },
    toggleModal() {
      this.isShowForm = !this.isShowForm;
    },
  },
};
</script>

<style>
</style>
