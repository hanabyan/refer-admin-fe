<template>
  <q-dialog
    v-model="isShowForm"
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
          v-if="actionType === 'create'"
        >Add New Promo</div>
        <div
          class="text-h6"
          v-else>Edit Promo</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="col scroll">
        <div class="row q-col-gutter-xl">
          <div class="col">
            <q-input
              v-model="$v.form.name.$model"
              label="Name"
              :dense="false"
              :error="isSubmitted && $v.form.name.$error"
              :spellcheck="false"
            >
              <template v-slot:error>
                <p v-if="!$v.form.name.required">Promo name is required</p>
              </template>
            </q-input>
          </div>
        </div>
        <div class="row q-col-gutter-xl">
          <div class="col">
          <q-input
            v-model="$v.form.description.$model"
            label="Description"
            :dense="false"
            type="textarea"
            rows="4"
            :error="isSubmitted && $v.form.description.$error"
            :spellcheck="false"
          >
            <template v-slot:error>
              <p v-if="!$v.form.description.required">Description is required</p>
            </template>
          </q-input>
          </div>
        </div>
        <div class="row q-col-gutter-xl">
          <!-- left column -->
          <div class="col col-md-6">
            <div class="q-mb-md">
              <q-field label="Promo Type" stack-label>
                <template v-slot:control>
                  <div class="q-gutter-sm">
                    <q-radio v-model="form.promo_type" val="0" label="Pulsa" />
                    <q-radio v-model="form.promo_type" val="1" label="Product" />
                  </div>
                </template>
              </q-field>
            </div>

            <div class="q-mb-md">
              <q-input
                type="number"
                v-model="form.promo_value"
                label="Promo value"
                :dense="false"
              >
              </q-input>
            </div>

            <q-input
              filled
              v-model="form.period_start"
              mask="date"
              :rules="['date']"
              label="Period Start"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qStartDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date
                      v-model="form.period_start" @input="() => $refs.qStartDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input
              filled
              v-model="form.period_end"
              mask="date"
              :rules="['date']"
              label="Period End"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qEndDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date
                      v-model="form.period_end"
                      @input="() => $refs.qEndDateProxy.hide()"
                      :options="periodEndOptions"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <!-- right column -->
          <div class="col col-md-6">
            <div class="q-mb-md">
              <q-field label="Availability" stack-label>
                <template v-slot:control>
                  <div class="q-gutter-sm">
                    <q-radio v-model="form.promo_type" val="0" label="Limited" />
                    <q-radio v-model="form.promo_type" val="1" label="Unlimited" />
                  </div>
                </template>
              </q-field>
            </div>

            <div class="q-mb-md">
              <q-input
                type="number"
                v-model="form.referral_commission"
                label="Referral commission"
                :dense="false"
              >
              </q-input>
            </div>

            <div class="q-mb-md">
              <q-input
                type="number"
                v-model="form.referral_share_count"
                label="Referral share count"
              >
                <!-- <template v-slot:error>
                  <p
                    v-if="!$v.form.referral_share_count.required"
                  >Referral share count is required</p>
                </template> -->
              </q-input>
            </div>
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
/* eslint quote-props: 0 */
// import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';
// import myUpload from 'vue-image-crop-upload';
// import token from '../../_helper/token.helper';
// import { productService } from '../../_services';

export default {
  // name: 'ComponentName',
  components: {
    // 'my-upload': myUpload,
  },
  beforeMount() {
    this.form = { ...this.formDataObj };
  },
  props: ['isShowForm', 'actionType', 'formDataObj', 'toggle', 'refetch'],
  data() {
    return {
      isSubmitting: false,
      isSubmitted: false,
      form: {},
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      description: {
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
    periodEndOptions(date) {
      return date >= this.form.period_start;
    },
    async handleSubmit() {
      /*
      this.isSubmitting = true;
      this.isSubmitted = true;
      this.$v.$touch();

      if (this.$v.$error) {
        this.isSubmitting = false;
        return;
      }

      const {
        name, description, image, client_id: client,
        estimated_price: estimatedPrice, sku, category_id: category,
      } = this.form;

      const payload = {
        name,
        description,
        image: this.imgDataUrl || image,
        client_id: typeof client === 'object' ? client.value : client,
        estimated_price: estimatedPrice,
        sku,
        category_id: typeof category === 'object' ? category.value : category,
      };

      if (this.actionType === 'create') {
        try {
          const created = await productService.create(payload);
          if (created) {
            this.$emit('refetch');
            this.toggleModal();
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
      } else if (this.actionType === 'edit') {
        try {
          const updated = await productService.update(payload, this.form.id);
          if (updated) {
            this.$emit('refetch');
            this.toggleModal();
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
      } */
    },
  },
  // computed: {
  //   ...mapGetters('category', ['productOptions']),
  //   ...mapGetters('client', ['clientOptions']),
  // },
};
</script>

<style>
</style>
