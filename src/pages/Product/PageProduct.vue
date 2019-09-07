<template>
<!-- TODO: ketika update image belum, muncul dimunculkan di list -->
  <div class="q-pa-md">
    <q-table
      :data="products"
      :columns="columns"
      row-key="client_id"
    >
      <template v-slot:top>
          <div class="text-h6">Product</div>
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
  name: 'PageProduct',
  components: {
    FormModal,
  },
  beforeMount() {
    /* get category */
    this.getClient();
    this.getProductCategory();
  },
  mounted() {
    this.getProduct();
  },
  data() {
    // TODO: image
    return {
      columns: [
        {
          name: 'name',
          label: 'Product Name',
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
          name: 'estimated_price',
          label: 'Estimated Price',
          field: 'estimated_price',
          sortable: true,
          align: 'left',
        },
        {
          name: 'sku',
          label: 'SKU',
          field: 'sku',
          sortable: true,
          align: 'left',
        },
        {
          name: 'category_name',
          label: 'Category',
          field: 'category_name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'client_name',
          label: 'Client',
          field: 'client_name',
          sortable: true,
          align: 'left',
        },
      ],
      isShowForm: false,
      actionType: '',
      formDataObj: {},
    };
  },
  methods: {
    ...mapActions('product', ['getProduct']),
    ...mapActions('client', ['getClient']),
    ...mapActions('category', {
      getProductCategory: 'getProduct',
    }),
    refetch() {
      this.getProduct();
    },
    addNew() {
      this.isShowForm = true;
      this.actionType = 'create';
      this.formDataObj = {
        name: '',
        description: '',
        image: '',
        estimated_price: '',
        sku: '',
        category_id: '',
        client_id: '',
        // status: '',
      };
    },
    onRowClick(row) {
      this.isShowForm = true;
      this.actionType = 'edit';
      const data = { ...row };
      Object.assign(data, {
        client_id:
        this.clientOptions.find(item => parseInt(item.value, 10)
          === parseInt(data.client_id, 10)),
        category_id:
        this.productOptions.find(item => parseInt(item.value, 10)
          === parseInt(data.category_id, 10)),
      });
      this.formDataObj = data;
    },
    toggleModal() {
      this.isShowForm = !this.isShowForm;
    },
  },
  computed: {
    products() {
      return this.$store.state.product.list;
    },
    ...mapGetters('category', ['productOptions']),
    ...mapGetters('client', ['clientOptions']),
  },
};
</script>

<style>
</style>
