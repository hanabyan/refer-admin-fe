<template>
  <div class="q-pa-md">
    <q-table
      :data="featured"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top>
          <div class="text-h6">Featured Promo Product</div>
          <q-space/>
          <q-btn
            color="primary"
            label="Add New"
            @click="addNew"
          />
      </template>

      <template v-slot:body-cell-id="props">
        <q-td
          key="id"
          :props="props"
        >
          <q-btn
            color="primary"
            label="Delete"
            size="sm"
            @click="removeProductPromo(props)"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-featured_order="props">
        <q-td
          :key="props.col.featured_order"
          :props="props"
        >
          <q-input
            type="number"
            v-model="props.row.featured_order"
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

    <q-card
      class="q-mt-sm text-right"
      flat
    >
      <q-card-section>
        <q-btn
          label="Cancel"
          class="q-mr-sm"
          @click="fetchFeatured"
          :disable="isSubmitting"
        />
        <q-btn
          label="Save"
          color="primary"
          @click="onSave"
          :disable="isSubmitting"
        />
      </q-card-section>
    </q-card>

    <ModalSetFeatured
      v-if="isOpenSetFeatured"
      :isOpen="isOpenSetFeatured"
      @toggle="toggleSetFeatured"
      @onSelected="onFeatuedSelected"
      :featured="featured"
    />
  </div>
</template>

<script>
import { promoService } from '../../_services';

import ModalSetFeatured from './ModalSetFeatured';

export default {
  // name: 'PageName',
  components: {
    ModalSetFeatured,
  },
  beforeMount() {
    this.fetchFeatured();
  },
  data() {
    return {
      isOpenSetFeatured: false,
      featured: [],
      isSubmitting: false,
      columns: [
        {
          name: 'id',
          label: '',
          field: 'id',
          sortable: true,
          align: 'left',
        },
        {
          name: 'image',
          label: 'Image',
          field: 'image',
          sortable: true,
          align: 'left',
        },
        {
          name: 'featured_order',
          label: 'Order Number',
          field: 'featured_order',
          sortable: true,
          align: 'left',
        },
        {
          name: 'product_name',
          label: 'Product Name',
          field: 'product_name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'promo_name',
          label: 'Promo Name',
          field: 'promo_name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'promo_description',
          label: 'Promo Description',
          field: 'promo_description',
          sortable: true,
          align: 'left',
        },
      ],
    };
  },
  methods: {
    toggleSetFeatured() {
      this.isOpenSetFeatured = !this.isOpenSetFeatured;
    },
    fetchFeatured() {
      promoService.getPromoFeatured().then((res) => {
        this.featured = res;
      }, (rej) => {
        console.log(rej);
      });
    },
    onSave() {
      this.isSubmitting = true;
      promoService.updateFeatured({ promo: this.featured }).then(() => {
        this.fetchFeatured();

        this.$q.notify({ color: 'positive', message: 'Berhasil mengupdate featured', position: 'top-right' });
        this.isSubmitting = false;
      }, (rej) => {
        let errMsg = 'Gagal mengupdate featured';

        if (typeof rej === 'string') {
          errMsg = rej;
        }

        this.$q.notify({ color: 'negative', message: errMsg, position: 'top-right' });
        this.isSubmitting = false;
      });
    },
    addNew() {
      this.toggleSetFeatured();
    },
    onFeatuedSelected(data) {
      this.featured = [...data, ...this.featured];
      this.toggleSetFeatured();
    },
    removeProductPromo(data) {
      this.featured = this.featured.filter(item => parseInt(item.id, 10)
        !== parseInt(data.value, 10));
    },
  },
};
</script>

<style>
</style>
