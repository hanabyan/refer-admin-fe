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
        >
          <span v-if="actionType === 'create'">Add {{ title }}</span>
          <span v-else>Edit {{ title }}</span>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="col scroll">
        <div class="row">
          <div class="col">
            <div class="q-mb-md">
              <q-input
                v-model="$v.form.name.$model"
                label="Category Name"
                :dense="false"
                lazy-rules
                :error="isSubmitted && $v.form.name.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.name.required">Category Name is required</p>
                </template>
              </q-input>
            </div>
            <div class="q-mb-md">
              <q-input
                v-model="form.description"
                label="Description"
                :dense="false"
                type="textarea"
                rows="4"
              />
            </div>
            <div
              class="q-mb-md"
              v-if="actionType === 'edit'"
            >
              <q-select
                v-model="form.status"
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
import { categoryService } from '../../_services';

const STATUS_OPTIONS = STATUS.get();

export default {
  name: 'CategoryFormModal',
  props: ['isOpen', 'actionType', 'formType', 'formDataObj', 'title', 'toggle', 'refetch'],
  beforeMount() {
    this.form = { ...this.formDataObj };
  },
  data() {
    return {
      STATUS_OPTIONS,
      form: {
        name: '',
        description: '',
        status: '',
      },
      isSubmitted: false,
      isSubmitting: false,
    };
  },
  validations: {
    form: {
      name: {
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

      if (this.actionType === 'create') {
        try {
          const created = await this.create();
          if (created) {
            this.$emit('refetch', this.formType);
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
          const updated = await this.update();
          if (updated) {
            this.$emit('refetch', this.formType);
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
    create() {
      const { name, description } = this.form;

      const payload = {
        name,
        description,
      };

      if (this.formType === 'business') {
        return categoryService.createBusiness(payload);
      }

      if (this.formType === 'product') {
        return categoryService.createProduct(payload);
      }

      return false;
    },
    update() {
      const {
        id, name, description, status,
      } = this.form;

      const payload = {
        name,
        description,
        status: status.value,
      };

      if (this.formType === 'business') {
        return categoryService.updateBusiness(payload, id);
      }

      if (this.formType === 'product') {
        return categoryService.updateProduct(payload, id);
      }

      return false;
    },
  },
};
</script>

<style>
</style>
