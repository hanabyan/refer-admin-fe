<template>
  <q-dialog
    v-model="isOpen"
    persistent
  >
    <q-card>
      <q-card-section>
        <q-table
          :data="products"
          :columns="columns"
          title="Set Promo Product"
          row-key="id"
          selection="multiple"
          :selected.sync="selected"
        ></q-table>
      </q-card-section>
      <q-card-actions
        align="right"
        class="bg-white text-teal"
      >
        <q-btn
          flat
          label="Cancel"
          @click="handleCancel"
          :disable="isSubmitting"
        />
        <q-btn
          flat
          label="Save"
          @click="handleSubmit"
          :loading="isSubmitting"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ModalSetProduct',
  beforeMount() {
    this.getProduct();
  },
  props: ['isOpen', 'toggle'],
  data() {
    return {
      isSubmitting: false,
      selected: [],
      columns: [
        {
          name: 'name',
          label: 'Name',
          field: 'name',
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
    };
  },
  methods: {
    ...mapActions('product', ['getProduct']),
    toggleModal() {
      this.$emit('toggle');
    },
    handleCancel() {
      this.toggleModal();
    },
    handleSubmit() {
      console.log(this.selected);
      this.toggleModal();
    },
  },
  computed: {
    products() {
      return this.$store.state.product.list;
    },
  },
};
</script>

<style>
</style>
