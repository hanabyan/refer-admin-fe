<template>
  <q-dialog
    v-model="isOpen"
    square
    full-height
    persistent
    position="right"
  >
    <q-card
      class="column
      fixed-right
      full-height"
      style="width: 700px"
    >
      <q-card-section>
        <div
          class="text-h6"
        >Detail Claim</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="col scroll">
        <div class="row">
          <div class="col-md-6">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Receipt Image</q-item-label>
                </q-item-section>
              </q-item>
              <div class="q-pa-md">
                <q-img :src="form.receipt_image" />
              </div>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Promo Name</q-item-label>
                  <q-item-label>{{ form.promo_name }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Product Name</q-item-label>
                  <q-item-label>{{ form.product_name }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Product SKU</q-item-label>
                  <q-item-label>{{ form.sku }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Promo Description</q-item-label>
                  <q-item-label>{{ form.promo_description }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Estimated Price</q-item-label>
                  <q-item-label>{{ form.estimated_price }}</q-item-label>
                </q-item-section>
              </q-item>
              <!-- <q-item>
                <q-item-section>
                  <q-item-label caption>User id</q-item-label>
                  <q-item-label>{{ form.user_id }}</q-item-label>
                </q-item-section>
              </q-item> -->
              <q-item>
                <q-item-section>
                  <q-item-label caption>User name</q-item-label>
                  <q-item-label>{{ form.user_name }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>User phone</q-item-label>
                  <q-item-label>{{ form.user_phone }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-md-6">
            <q-input
              v-model="$v.form.receiptDate.$model"
              label="Receipt Transaction Date"
              mask="date"
              :rules="['date']"
              :error="isSubmitted && $v.form.receiptDate.$error"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale" ref="rDate">
                    <q-date
                      v-model="$v.form.receiptDate.$model"
                      @input="() => $refs.rDate.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:error>
                <p v-if="!$v.form.receiptDate.required">Receipt date is required</p>
              </template>
            </q-input>

            <q-input
              v-model="$v.form.receiptTime.$model"
              mask="fulltime"
              :rules="['fulltime']"
              label="Receipt Transaction Time"
              :error="isSubmitted && $v.form.receiptTime.$error"
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale" ref="rTime">
                    <q-time
                      v-model="$v.form.receiptTime.$model"
                      with-seconds
                      format24h
                      @input="() => $refs.rTime.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:error>
                <p v-if="!$v.form.receiptTime.required">Receipt time is required</p>
              </template>
            </q-input>

            <q-input
              v-model="$v.form.receiptPlace.$model"
              label="Receipt Place"
              dense
              lazy-rules
              type="textarea"
              rows="4"
              :error="isSubmitted && $v.form.receiptPlace.$error"
            >
              <template v-slot:error>
                <p v-if="!$v.form.receiptPlace.required">Receipt place is required</p>
              </template>
            </q-input>

            <q-input
              v-model="form.note"
              label="Notes"
              dense
              lazy-rules
              type="textarea"
              rows="4"
            >
              <!-- <template v-slot:error>
                <p v-if="!$v.form.company_name.required">Company name is required</p>
              </template> -->
            </q-input>

            <!-- TODO: status -->
            <q-select
              v-model="form.status"
              :options="referenceStatus"
              label="Status"
            />

          </div>
        </div>
      </q-card-section>

      <q-separator />

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
// import { required, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import moment from 'moment';
import { rewardService } from '../../_services';

export default {
  // name: 'ComponentName',
  beforeMount() {
    this.form = {
      ...this.formDataObj,
      status: this.referenceStatus.find(ref => parseInt(ref.value, 10)
        === parseInt(this.formDataObj.status, 10)),
      note: '',
      // receiptDate: moment().format('YYYY-MM-DD'),
      receiptDate: '',
      // receiptTime: moment().format('HH:mm:ss'),
      receiptTime: '',
      receiptPlace: '',
    };
  },
  mounted() {
    rewardService.getLogClaim(this.form.id).then((res) => {
      if (res.length > 0) {
        const lastLog = res[0];

        this.form.receiptDate = moment(lastLog.receipt_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY/MM/DD');
        this.form.receiptTime = moment(lastLog.receipt_time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
        this.form.receiptPlace = lastLog.receipt_place;
        this.form.status = this.referenceStatus.find(ref => parseInt(ref.value, 10)
          === parseInt(lastLog.status_to, 10));
        this.form.note = lastLog.note;
      }
      console.log(res);
      console.log(res.length);
    }, (rej) => {
      console.log(rej);
    });
  },
  props: ['isOpen', 'actionType', 'formDataObj', 'toggle'],
  data() {
    return {
      isSubmitting: false,
      isSubmitted: false,
      form: {},
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
    };
  },
  validations: {
    form: {
      receiptDate: {
        required,
      },
      receiptTime: {
        required,
      },
      receiptPlace: {
        required,
      },
    },
  },
  methods: {
    toggleModal() {
      this.$emit('toggle');
    },
    handleCancel() {
      this.toggleModal();
    },
    async handleSubmit() {
      this.isSubmitting = true;
      this.isSubmitted = true;
      this.$v.$touch();

      if (this.$v.$error) {
        this.isSubmitting = false;
        return;
      }

      const {
        form:
        {
          receiptDate, receiptTime, receiptPlace, note, status,
        },
      } = this;

      const payload = {
        status: status.value,
        note,
        receipt_time: `${moment(receiptDate, 'YYYY/MM/DD').format('YYYY-MM-DD')} ${receiptTime}`,
        receipt_place: receiptPlace,
      };
      console.log(payload);
      console.log(this.form);
      console.log(rewardService);

      try {
        const updated = await rewardService.updateClaim(this.form.id, payload);
        if (updated) {
          this.$emit('refetch');
          this.toggleModal();
        }
      } catch (e) {
        console.log(e);
        this.isSubmitting = false;
        let errMsg = 'Terjadi kesalahan';

        if (typeof e === 'string') {
          errMsg = e;
        }
        // if (e.response.status >= 400) {
        //   let errMsg = 'Unknown error';
        //   const { data } = e.response;

        //   if (data && typeof data === 'string') {
        //     errMsg = data;
        //   }

        //   if (data && data.message && typeof data.message === 'string') {
        //     errMsg = data.message;
        //   }

        //   this.isSubmitting = false;
        // }
        this.$q.notify({ color: 'negative', message: errMsg, position: 'top-right' });
      }
    },
  },
  computed: {
    ...mapGetters('category', ['businessOptions']),
  },
};
</script>

<style>
</style>
