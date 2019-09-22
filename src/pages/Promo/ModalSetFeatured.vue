<template>
  <q-dialog
    v-model="isOpen"
    persistent
  >
    <q-card>
      <q-card-section>
        <q-table
          :data="promoProducts"
          :columns="columns"
          title="Pick Promo Product"
          row-key="id"
          selection="multiple"
          :selected.sync="selected"
          binary-state-sort
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
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
// import { mapActions } from 'vuex';
import { promoService } from '../../_services';

const TOTAL_ALLOWED = 4;

export default {
  name: 'ModalSetFeatured',
  beforeMount() {
    const promoIds = this.featured.map(item => item.id);
    promoService.getPromoFeaturedNew(promoIds.join()).then((res) => {
      this.promoProducts = res;
    }, (rej) => {
      console.log(rej);
    });
  },
  props: ['isOpen', 'toggle', 'onSelected', 'featured'],
  data() {
    return {
      isSubmitting: false,
      filter: '',
      selected: [],
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
    toggleModal() {
      this.$emit('toggle');
    },
    handleCancel() {
      this.toggleModal();
    },
    handleSubmit() {
      if (parseInt(this.featured.length, 10) + parseInt(this.selected.length, 10) > TOTAL_ALLOWED) {
        this.$q.notify({ color: 'negative', message: 'Maksimum featuerd hanya 4, hapus featured terlebit dahulu', position: 'top-right' });
      } else {
        this.$emit('onSelected', this.selected);
      }
    },
  },
};
</script>

<style>
</style>
