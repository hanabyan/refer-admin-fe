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
          v-if="actionType === 'create'"
        >Add New User</div>
        <div
          class="text-h6"
          v-else>Edit User</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="col scroll">
        <div class="row">
          <div class="col">

            <div class="q-mb-md">
              <q-input
                v-model="$v.form.name.$model"
                label="Name"
                :dense="false"
                lazy-rules
                :error="isSubmitted && $v.form.name.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.name.required">Name is required</p>
                </template>
              </q-input>
            </div>

            <div class="q-mb-md">
              <q-input
                v-model="$v.form.phone.$model"
                label="Phone"
                :dense="false"
                lazy-rules
                type="phone"
                :error="isSubmitted && $v.form.name.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.phone.required">Phone is required</p>
                </template>
              </q-input>
            </div>

            <div class="q-mb-md">
              <q-input
                v-model="$v.form.email.$model"
                label="Email"
                :dense="false"
                lazy-rules
                type="email"
                :error="isSubmitted && $v.form.email.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.email.required">Email is required</p>
                </template>
              </q-input>
            </div>

            <div
              class="q-mb-md"
            >
              <q-select
                v-model="form.verified"
                :options="STATUS_OPTIONS"
                label="Status"
              />
            </div>

            <div class="q-mb-md">
              <q-input
                v-model="form.password"
                label="Password"
                :dense="false"
                lazy-rules
                type="password"
              >
              </q-input>
            </div>

          </div>
        </div>
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
import { required } from 'vuelidate/lib/validators';
import { STATUS } from '../../_const';
import { userService } from '../../_services';

const STATUS_OPTIONS = STATUS.getUserStep();

export default {
  name: 'UserFormModal',
  props: ['isOpen', 'actionType', 'formDataObj', 'title', 'toggle', 'refetch'],
  beforeMount() {
    this.form = { ...this.formDataObj };
  },
  data() {
    return {
      STATUS_OPTIONS,
      form: {},
      isSubmitted: false,
      isSubmitting: false,
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      phone: {
        required,
      },
      email: {
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
        name, email, phone, verified, password,
      } = this.form;

      const payload = {
        name, email, phone, verified: verified.value,
      };

      if (password.trim().length > 0) {
        Object.assign(payload, {
          password,
        });
      }

      if (this.actionType === 'create') {
        try {
          const created = await userService.create(payload);
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
          const updated = await userService.update(payload, this.form.id);
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
  },
};
</script>

<style>
</style>
