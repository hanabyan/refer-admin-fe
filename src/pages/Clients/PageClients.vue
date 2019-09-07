<template>
  <div class="q-pa-md">
    <q-table
      :data="clients"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top>
          <div class="text-h6">Clients</div>
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
      v-if="isShowForm"
      :isShowForm="isShowForm"
      :actionType="actionType"
      :formDataObj="{...formDataObj}"
      @toggle="toggleModal"
      @refetch="refetch"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FormModal from './FormModal.vue';

export default {
  name: 'PageClients',
  components: {
    FormModal,
  },
  beforeMount() {
    /* get category */
    this.getBusiness();
  },
  mounted() {
    this.getClient();
  },
  methods: {
    ...mapActions('client', ['getClient']),
    ...mapActions('category', ['getBusiness']),
    onRowClick(row) {
      this.isShowForm = true;
      this.actionType = 'edit';
      const data = { ...row };
      Object.assign(data, {
        business_category_id:
        this.businessOptions.find(item => parseInt(item.value, 10)
          === parseInt(data.business_category_id, 10)),
      });
      this.formDataObj = data;
    },
    addNew() {
      this.isShowForm = true;
      this.actionType = 'create';
      this.formDataObj = {
        company_name: '',
        business_category_id: '',
        website: '',
        business_address: '',
        pic_name: '',
        mobile_phone: '',
        email: '',
        username: '',
        password: '',
        // status: '',
      };
    },
    refetch() {
      this.getClient();
    },
    toggleModal() {
      this.isShowForm = !this.isShowForm;
    },
  },
  data() {
    return {
      isShowForm: false,
      actionType: 'create',
      formDataObj: {},
      columns: [
        {
          name: 'company',
          label: 'Company Name',
          field: 'company_name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'category_name',
          label: 'Category',
          field: 'business_category_name',
          align: 'left',
        },
        {
          name: 'pic',
          label: 'PIC',
          field: 'pic_name',
          align: 'left',
        },
        {
          name: 'phone',
          label: 'Phone',
          field: 'mobile_phone',
          align: 'left',
        },
        {
          name: 'email',
          label: 'Email',
          field: 'email',
          align: 'left',
        },
      ],
    };
  },
  computed: {
    clients() {
      return this.$store.state.client.list;
    },
    ...mapGetters('category', ['businessOptions']),
  },
};
</script>

<style scoped>
  .column .col-grow {
    max-height: none;
    height: 1px;
  }
</style>
