<template>
  <div class="q-pa-md">
    <q-table
      :data="promoProducts"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top>
          <div class="text-h6">Promo Product</div>
          <q-space/>
          <q-btn
            color="primary"
            label="Add New"
            @click="addNew"
          />
      </template>

      <template v-slot:body-cell-total_item="props">
        <q-td
          :key="props.col.total_item"
          :props="props"
        >
          <q-input
            type="number"
            v-model="props.row.total_item"
            dense
          />
        </q-td>
      </template>

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

    <q-card class="q-mt-sm text-right" flat>
      <q-card-section>
        <q-btn label="Cancel" class="q-mr-sm" @click="$router.replace('/promo')" />
        <q-btn label="Save" color="primary" @click="onSavePromoProduct"/>
      </q-card-section>
    </q-card>

    <ModalSetProduct
      v-if="isOpenSetProduct"
      :isOpen="isOpenSetProduct"
      @toggle="toggleSetProduct"
      @onSelected="onProductSelected"
      :promoProducts="promoProducts"
    />
  </div>
</template>

<script>
import ModalSetProduct from './ModalSetProduct';
import { promoService } from '../../_services';

export default {
  // name: 'PageName',
  components: {
    ModalSetProduct,
  },
  mounted() {
    const { id } = this.$route.params;
    promoService.getPromoProduct(id).then((res) => {
      this.promoProducts = res;
    }, (rej) => {
      console.log(rej);
    });
  },
  data() {
    return {
      promoProducts: [],
      columns: [
        {
          name: 'image',
          label: 'Image',
          field: 'image',
          sortable: true,
          align: 'left',
        },
        {
          name: 'total_item',
          label: 'Total Item',
          field: 'total_item',
          sortable: true,
          align: 'left',
        },
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
      isOpenSetProduct: false,
    };
  },
  methods: {
    toggleSetProduct() {
      this.isOpenSetProduct = !this.isOpenSetProduct;
    },
    addNew() {
      this.toggleSetProduct();
    },
    onProductSelected(data) {
      const withDefaultTotal = data.map(item => Object.assign({}, item, { total_item: 0 }));
      this.promoProducts = [...withDefaultTotal, ...this.promoProducts];
      this.toggleSetProduct();
    },
    async onSavePromoProduct() {
      try {
        const updated = promoService.updatePromoProduct({
          product: this.promoProducts,
        }, this.$route.params.id);

        if (updated) {
          // this.$emit('refetch');
          // this.toggleModal();
          this.$router.replace('/promo');
        }
      } catch (e) {
        if (e.response.status >= 400) {
          let errMsg = 'Unknown error';
          const { data } = e.response;

          if (data && typeof data === 'string') {
            errMsg = data;
          }

          if (data && data.message && typeof data.message === 'string') {
            errMsg = data.message;
          }

          this.isSubmitting = false;
          this.$q.notify({ color: 'negative', message: errMsg, position: 'top-right' });
        }
      }
    },
  },
};
</script>

<style>
</style>
