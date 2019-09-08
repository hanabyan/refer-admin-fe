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
                v-model="form.name"
                label="Name"
                :dense="false"
                lazy-rules
              >
              </q-input>
            </div>

            <div class="q-mb-md">
              <q-input
                v-model="form.phone"
                label="Phone"
                :dense="false"
                lazy-rules
                type="phone"
              >
              </q-input>
            </div>

            <div class="q-mb-md">
              <q-input
                v-model="form.email"
                label="Email"
                :dense="false"
                lazy-rules
                type="email"
              >
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
        name, email, phone, verified,
      } = this.form;

      const payload = {
        name, email, phone, verified,
      };

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
