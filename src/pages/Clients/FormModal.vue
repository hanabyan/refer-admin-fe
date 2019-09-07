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
        >Add New Client</div>
        <div
          class="text-h6"
          v-else
        >Edit Client</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="col scroll">
        <div class="row q-col-gutter-xl">
          <div class="col">
            <div class="q-mb-md">
              <q-input
                v-model="$v.form.company_name.$model"
                label="Company Name"
                :dense="false"
                lazy-rules
                :error="isSubmitted && $v.form.company_name.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.company_name.required">Company name is required</p>
                </template>
              </q-input>
            </div>
            <div class="q-mb-md">
              <q-select
                v-model="$v.form.business_category_id.$model"
                :options="businessOptions"
                label="Business Category"
                lazy-rules
                :error="isSubmitted && $v.form.business_category_id.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.business_category_id.required">Category is required</p>
                </template>
              </q-select>
            </div>
            <div class="q-mb-md">
              <q-input
                v-model="form.website"
                label="Website"
                :dense="false"
                type="url"
              />
            </div>
            <div class="q-mb-md">
              <q-input
                v-model="form.business_address"
                label="Address (HQ)"
                :dense="false"
                type="textarea"
                rows="4"
              />
            </div>
          </div>

          <div class="col">
            <div class="q-mb-md">
              <q-input
                v-model="$v.form.pic_name.$model"
                label="PIC Name"
                :dense="false"
                lazy-rules
                :error="isSubmitted && $v.form.pic_name.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.pic_name.required">PIC name is required</p>
                </template>
              </q-input>
            </div>
            <div class="q-mb-md">
              <q-input
                v-model="$v.form.mobile_phone.$model"
                label="PIC Phone"
                :dense="false"
                type="tel"
                lazy-rules
                :error="isSubmitted && $v.form.mobile_phone.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.mobile_phone.required">Mobile phone is required</p>
                </template>
              </q-input>
            </div>
            <div class="q-mb-md">
              <q-input
                v-model="$v.form.email.$model"
                label="PIC Email"
                :dense="false"
                type="email"
                lazy-rules
                :error="isSubmitted && $v.form.email.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.email.required">Email is required</p>
                  <p v-if="!$v.form.email.email">Email format not valid</p>
                </template>
              </q-input>
            </div>
            <div class="q-mb-md">
              <q-input
                v-model="$v.form.username.$model"
                label="Username"
                :dense="false"
                lazy-rules
                :error="isSubmitted && $v.form.username.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.username.required">Username is required</p>
                </template>
              </q-input>
            </div>
            <div class="q-mb-md">
              <q-input
                type="password"
                v-model="form.password"
                label="Password"
                :dense="false"
              >
                <!-- <template v-slot:error>
                  <p v-if="!$v.form.password.required">Password is required</p>
                </template> -->
              </q-input>
            </div>
            <!-- TODO: status here kalau edit, ga jadi kayake -->
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
import { required, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { clientService } from '../../_services';

export default {
  // name: 'ComponentName',
  beforeMount() {
    this.form = { ...this.formDataObj };
  },
  props: ['isShowForm', 'actionType', 'formDataObj', 'toggle'],
  data() {
    return {
      isSubmitting: false,
      isSubmitted: false,
      form: {},
    };
  },
  validations: {
    form: {
      company_name: {
        required,
      },
      business_category_id: {
        required,
      },
      pic_name: {
        required,
      },
      mobile_phone: {
        required,
      },
      email: {
        required,
        email,
      },
      username: {
        required,
      },
      // password: {
      //   required,
      // },
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
        company_name: companyName,
        business_category_id: businessCategoryId,
        website,
        business_address: businessAddress,
        pic_name: picName,
        mobile_phone: phone,
        email: inputEmail,
        username,
        password,
      } = this.form;

      const payload = {
        company_name: companyName,
        business_category_id: typeof businessCategoryId === 'object' ? businessCategoryId.value : businessCategoryId,
        website,
        business_address: businessAddress,
        pic_name: picName,
        mobile_phone: phone,
        email: inputEmail,
        username,
        password,
      };

      if (this.actionType === 'create') {
        try {
          const created = await this.create(payload);
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
          if (!payload.password) {
            /* very important to delete password if empty, so not updated */
            delete payload.password;
          }
          const updated = await this.update(payload, this.form.id);
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
      }
    },
    create(payload) {
      return clientService.create(payload);
    },
    update(payload, id) {
      return clientService.update(payload, id);
    },
  },
  computed: {
    ...mapGetters('category', ['businessOptions']),
  },
};
</script>

<style>
</style>
