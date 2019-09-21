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
        >Withdrawal Detail</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="col scroll">
        <div class="row q-mb-lg">
          <div class="col">
            <q-item>
              <q-item-section>
                <q-item-label caption>Requested Date</q-item-label>
                <q-item-label>{{ form.user_req_date }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col">
            <q-item>
              <q-item-section>
                <q-item-label caption>Requested Amount</q-item-label>
                <q-item-label>{{ convertToCurrency(form.user_req_nominal) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col">
            <q-item>
              <q-item-section>
                <q-item-label caption>User Balance</q-item-label>
                <q-item-label>{{ convertToCurrency(userBalance) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label caption>User Name</q-item-label>
                  <q-item-label>{{ form.user_name }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>User Phone</q-item-label>
                  <q-item-label>{{ form.user_phone }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>No. KTP</q-item-label>
                  <q-item-label>{{ form.no_ktp }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>No. NPWP</q-item-label>
                  <q-item-label>{{ form.no_npwp }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-md-6">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Bank Name</q-item-label>
                  <q-item-label>{{ form.bank_name }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Bank Account Holder Name</q-item-label>
                  <q-item-label>{{ form.bank_account_beneficiary }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Bank Account Number</q-item-label>
                  <q-item-label>{{ form.bank_account_number }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-item>
              <q-item-section>
                <q-input
                  v-model="form.note"
                  label="Note"
                  :dense="false"
                  lazy-rules
                  :error="false"
                >
                  <template v-slot:error>
                    <!-- <p v-if="!$v.form.company_name.required">Company name is required</p> -->
                  </template>
                </q-input>
                </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-select
                  v-model="$v.form.status.$model"
                  :options="statusOptions"
                  label="Status"
                  lazy-rules
                  :error="isSubmitted && $v.form.status.$error"
                >
                  <template v-slot:error>
                    <p v-if="!$v.form.status.required">Status is required</p>
                  </template>
                </q-select>
              </q-item-section>
            </q-item>

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
import { required } from 'vuelidate/lib/validators';
import { withdrawalService } from '../../_services';
import numberHelper from '../../_helper/number.helper';

export default {
  // name: 'ComponentName',
  beforeMount() {
    this.form = { ...this.formDataObj };
    withdrawalService.getBalance(this.formDataObj.user_id).then((res) => {
      this.userBalance = res.balance;
    }, (rej) => {
      console.log(rej);
    });
  },
  props: ['isOpen', 'actionType', 'formDataObj', 'toggle'],
  data() {
    return {
      isSubmitting: false,
      isSubmitted: false,
      userBalance: 0,
      form: {},
      statusOptions: [
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
          label: 'Declined',
        },
      ],
    };
  },
  validations: {
    form: {
      status: {
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
    convertToCurrency(value) {
      return numberHelper.getCurrency({ value });
    },
    async handleSubmit() {
      this.isSubmitting = true;
      this.isSubmitted = true;
      this.$v.$touch();

      if (this.$v.$error) {
        this.isSubmitting = false;
        return;
      }

      const { note, status } = this.form;

      const payload = { note, status: status.value };

      try {
        const withdrawal = await withdrawalService.update(payload, this.form.id);

        if (withdrawal) {
          this.$emit('refetch');
          this.toggleModal();
          this.$q.notify({ color: 'positive', message: 'Update berhasil', position: 'top-right' });
        }
      } catch (e) {
        if (e.response.status >= 400) {
          let errMsg = 'Gagal melakukan perubahan';
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
