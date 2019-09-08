<template>
  <div class="q-pa-md">
    <q-table
      :data="users"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top>
        <div class="text-h6">Users</div>
        <q-space/>
        <q-btn
          color="primary"
          label="Add New"
          @click="addNew"
        />
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
      v-if="isOpen"
      :isOpen="isOpen"
      :actionType="formActionType"
      :formDataObj="formDataObj"
      @toggle="toggleModal"
      @refetch="refetch"
    />
  </div>
</template>

<script>
import FormModal from './FormModal';
import { STATUS } from '../../_const';

export default {
  name: 'PageUsers',
  components: {
    FormModal,
  },
  data() {
    return {
      users: [],
      isOpen: false,
      formActionType: 'create',
      formDataObj: {},
      columns: [
        {
          name: 'name',
          label: 'Name',
          field: 'name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'phone',
          label: 'Phone',
          field: 'phone',
          sortable: true,
          align: 'left',
        },
        {
          name: 'email',
          label: 'Email',
          field: 'email',
          sortable: true,
          align: 'left',
        },
        {
          name: 'verified',
          label: 'Status',
          field: 'verified',
          sortable: true,
          align: 'left',
        },
        {
          name: 'referrer_code',
          label: 'Referrer Code',
          field: 'referrer_code',
          sortable: true,
          align: 'left',
        },
        {
          name: 'referrer_code_parent',
          label: 'Parent Referrer Code',
          field: 'referrer_code_parent',
          sortable: true,
          align: 'left',
        },
      ],
    };
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
    presetAdd() {
      this.formDataObj = {
        name: '',
        phone: '',
        email: '',
        verified: STATUS.rawUserStep.find(item => parseInt(item.value, 10) === 0),
      };
    },
    presetEdit(data) {
      const {
        id,
        name,
        phone,
        email,
        verified,
      } = data;

      const payload = {
        id,
        name,
        phone,
        email,
        verified: STATUS.rawUserStep.find(item => parseInt(item.value, 10)
          === parseInt(verified, 10)),
      };

      this.formDataObj = payload;
    },
    refetch() {
    },
    addNew() {
      this.formActionType = 'create';
      this.presetAdd();
      this.isOpen = true;
    },
    onRowClick(data) {
      this.formActionType = 'edit';
      this.presetEdit(data);
      this.isOpen = true;
    },
  },
};
</script>

<style>
</style>
