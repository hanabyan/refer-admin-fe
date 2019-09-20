<template>
  <div class="q-pa-md">
    <q-table
      :data="claims"
      :columns="columns"
      row-key="client_id"
    >
      <template v-slot:top>
        <div class="text-h6">Claim Reward</div>
        <q-space/>
        <!-- <q-btn
          color="primary"
          label="Add New"
          @click="addNew"
        /> -->
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
      v-if="isModalOpen"
      :isOpen="isModalOpen"
      :formDataObj="{...formDataObj}"
      @toggle="toggleModal"
      @refetch="refetch"
    />
  </div>
</template>

<script>
import moment from 'moment';

import FormModal from './FormModal';
import { rewardService } from '../../_services';

export default {
  // name: 'PageName',
  beforeMount() {
    rewardService.getClaims().then((res) => {
      const modifiedData = res.map(item => Object.assign({}, item, {
        status_name:
          this.referenceStatus.find(status => status.value === parseInt(item.status, 10)).label,
        uploaded_date: item.updated_at ? moment(item.updated_at, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY') : '-',
      }));

      this.claims = modifiedData;
    }, (rej) => {
      console.log(rej);
    });
  },
  components: {
    FormModal,
  },
  data() {
    return {
      isModalOpen: false,
      formDataObj: {},
      claims: [],
      referenceStatus: [
        {
          value: 0,
          label: 'New',
        },
        {
          value: 1,
          label: 'Approved',
        },
        {
          value: 2,
          label: 'Rejected',
        },
        {
          value: 3,
          label: 'Declined',
        },
        {
          value: 4,
          label: 'Receipt Uploaded',
        },
      ],
      columns: [
        {
          name: 'uploaded_date',
          label: 'Last update',
          field: 'uploaded_date',
          sortable: true,
          align: 'left',
        },
        {
          name: 'user_name',
          label: 'User',
          field: 'user_name',
          sortable: true,
          align: 'left',
        },
        {
          name: 'user_phone',
          label: 'User Phone',
          field: 'user_phone',
          sortable: true,
          align: 'left',
        },
        {
          name: 'promo_name',
          label: 'Promo',
          field: 'promo_name',
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
    onRowClick(data) {
      this.formDataObj = data;
      this.toggleModal();
    },
    refetch() {
      this.getClaim();
    },
    getClaim() {
      rewardService.getClaims().then((res) => {
        const modifiedData = res.map(item => Object.assign({}, item, {
          status_name:
            this.referenceStatus.find(status => status.value === parseInt(item.status, 10)).label,
          uploaded_date: moment(item.updated_at, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY'),
        }));

        this.claims = modifiedData;
      }, (rej) => {
        console.log(rej);
      });
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
  },
};
</script>

<style>
</style>
