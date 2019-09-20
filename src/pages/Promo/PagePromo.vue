<template>
  <div class="q-pa-md">
    <q-table
      :data="promos"
      :columns="columns"
      row-key="client_id"
    >
      <template v-slot:top>
          <div class="text-h6">Promo</div>
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
          class="cursor-pointer"
        >
          <q-td
            :key="props.cols[0].name"
            :props="props"
            @click.native="onRowClick(props.row)"
          >{{ props.cols[0].value }}</q-td>
          <q-td
            :key="props.cols[1].name"
            :props="props"
            @click.native="onRowClick(props.row)"
          >{{ props.cols[1].value }}</q-td>
          <q-td
            :key="props.cols[2].name"
            :props="props"
            @click.native="onRowClick(props.row)"
          >{{ props.cols[2].value }}</q-td>
          <q-td
            :key="props.cols[3].name"
            :props="props"
            @click.native="onRowClick(props.row)"
          >{{ props.cols[3].value }}</q-td>
          <q-td
            :key="props.cols[4].name"
            :props="props"
            @click.native="onRowClick(props.row)"
          >{{ props.cols[4].value }}</q-td>
          <q-td
            key="id"
            :props="props"
          >
            <q-btn
              color="primary"
              label="Set Product"
              size="sm"
              @click="showSettingProduct(props.cols[5].value)"
            />
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
import moment from 'moment';
// import { mapActions, mapGetters } from 'vuex';
import FormModal from './FormModal.vue';
import { promoService } from '../../_services';

export default {
  name: 'PageProduct',
  components: {
    FormModal,
  },
  mounted() {
    this.fetchPromo();
  },
  data() {
    return {
      promos: [],
      columns: [
        {
          name: 'name',
          label: 'Promo Name',
          field: 'name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'promo_type_name',
          label: 'Promo Type',
          field: 'promo_type_name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'promo_value',
          label: 'Promo Value',
          field: 'promo_value',
          sortable: true,
          align: 'left',
        },
        {
          name: 'period_start',
          label: 'Start',
          field: 'period_start',
          sortable: true,
          align: 'left',
        },
        {
          name: 'period_end',
          label: 'End',
          field: 'period_end',
          sortable: true,
          align: 'left',
        },
        // {
        //   name: 'unlimited',
        //   label: 'Unlimited',
        //   field: 'unlimited',
        //   sortable: true,
        //   align: 'left',
        // },
        {
          name: 'id',
          label: '',
          field: 'id',
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
    toggleModal() {
      this.isShowForm = !this.isShowForm;
    },
    async fetchPromo() {
      try {
        const promos = await promoService.get();

        if (promos) {
          const promoWithType = promos.map(item => Object.assign({}, item, { promo_type_name: parseInt(item.promo_type, 10) === 0 ? 'Pulsa' : 'Product' }));
          this.promos = promoWithType;
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

          this.$q.notify({ color: 'negative', message: errMsg, position: 'top-right' });
        }
      }
    },
    refetch() {
      this.fetchPromo();
    },
    addNew() {
      this.isShowForm = true;
      this.actionType = 'create';
      this.formDataObj = {
        name: '',
        description: '',
        promo_type: 0,
        promo_value: '',
        period_start: '',
        period_end: '',
        unlimited: 0,
        referral_commission: '',
        referral_share_count: '',
      };
    },
    onRowClick(row) {
      this.isShowForm = true;
      this.actionType = 'edit';
      const payload = { ...row };
      Object.assign(payload, {
        period_start: moment(payload.period_start, 'YYYY-MM-DD HH:mm:ss').format('YYYY/MM/DD'),
        period_end: moment(payload.period_end, 'YYYY-MM-DD HH:mm:ss').format('YYYY/MM/DD'),
      });
      this.formDataObj = payload;
    },
    showSettingProduct(id) {
      this.$router.push(`${this.$router.currentRoute.path}/${id}/product`);
    },
  },
  computed: {
    // products() {
    //   return this.$store.state.product.list;
    // },
    // ...mapGetters('category', ['productOptions']),
    // ...mapGetters('client', ['clientOptions']),
  },
};
</script>

<style>
</style>
