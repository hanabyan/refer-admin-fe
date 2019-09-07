<template>
  <div class="q-pa-md">
    <div class="row q-gutter-md">
      <div class="col">
        <q-table
          :data="getBusinessWithStatus"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:top>
              <div class="text-h6">Business Category</div>
              <q-space/>
              <q-btn
                color="primary"
                label="Add New"
                @click="addNewBusiness"
              />
          </template>

          <template v-slot:body="props">
            <q-tr
              :props="props"
              @click.native="onRowBusinessClick(props.row)"
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
      </div>

      <div class="col">
        <q-table
          :data="getProductWithStatus"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:top>
              <div class="text-h6">Product Category</div>
              <q-space/>
              <q-btn
                color="primary"
                label="Add New"
                @click="addNewProduct"
              />
          </template>

          <template v-slot:body="props">
            <q-tr
              :props="props"
              @click.native="onRowProductClick(props.row)"
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
      </div>
    </div>

    <FormModal
      v-if="isOpen"
      :isOpen="isOpen"
      :actionType="formActionType"
      :formType="formType"
      :title="formTitle"
      :formDataObj="formDataObj"
      @toggle="toggleModal"
      @refetch="refetch"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FormModal from './FormModal';
import { STATUS } from '../../_const';

export default {
  name: 'PageCategory',
  mounted() {
    this.getBusiness();
    this.getProduct();
  },
  components: {
    FormModal,
  },
  data() {
    return {
      isOpen: false,
      formActionType: 'create',
      formType: '',
      formTitle: '',
      formDataObj: {},
      columns: [
        {
          name: 'name',
          label: 'Category Name',
          field: 'name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
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
      ],
    };
  },
  methods: {
    ...mapActions('category', ['getBusiness', 'getProduct']),
    close() {
      this.isOpen = false;
    },
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
    presetAdd() {
      this.formDataObj = {
        id: '',
        name: '',
        description: '',
        status: 1,
      };
    },
    presetEdit(data) {
      const {
        id, name, description, status,
      } = data;

      const payload = {
        id,
        name,
        description,
        status: STATUS.raw.find(item => parseInt(item.value, 10) === parseInt(status, 10)),
      };

      this.formDataObj = payload;
    },
    refetch(type) {
      if (type === 'business') {
        this.getBusiness();
      } else if (type === 'product') {
        this.getProduct();
      }
    },
    addNewBusiness() {
      this.formActionType = 'create';
      this.formType = 'business';
      this.formTitle = 'Business Category';
      this.presetAdd();
      this.isOpen = true;
    },
    onRowBusinessClick(data) {
      this.formActionType = 'edit';
      this.formType = 'business';
      this.formTitle = 'Business Category';
      this.presetEdit(data);
      this.isOpen = true;
    },
    addNewProduct() {
      this.formActionType = 'create';
      this.formType = 'product';
      this.formTitle = 'Product Category';
      this.presetAdd();
      this.isOpen = true;
    },
    onRowProductClick(data) {
      this.formActionType = 'edit';
      this.formType = 'product';
      this.formTitle = 'Product Category';
      this.presetEdit(data);
      this.isOpen = true;
    },
  },
  computed: {
    ...mapGetters('category', ['getBusinessWithStatus', 'getProductWithStatus']),
  },
};
</script>

<style>
</style>
