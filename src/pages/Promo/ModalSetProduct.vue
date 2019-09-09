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
          title="Pick Promo Product"
          row-key="id"
          selection="multiple"
          :selected.sync="selected"
          binary-state-sort
        >
          <template v-slot:body-cell-image="props">
            <q-td
              :key="props.col.name"
            >
              <q-img
                style="width: 50px; height: 50px; background-color: rgba(0, 0, 0, 0.2)"
                :src="props.row.image"
              />
            </q-td>
          </template>
        </q-table>
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
    const productIds = this.promoProducts.map(item => item.id);
    this.getProduct(productIds.join());
  },
  props: ['isOpen', 'toggle', 'onSelected', 'promoProducts'],
  data() {
    return {
      isSubmitting: false,
      selected: [],
      columns: [
        {
          name: 'image',
          label: 'Image',
          field: 'image',
          sortable: true,
          align: 'left',
        },
        // {
        //   name: 'total',
        //   label: 'Total Item',
        //   field: '',
        //   sortable: true,
        //   align: 'left',
        // },
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
      this.$emit('onSelected', this.selected);
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
