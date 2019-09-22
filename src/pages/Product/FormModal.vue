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
        >Add New Product</div>
        <div
          class="text-h6"
          v-else>Edit Product</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="col scroll">
        <div class="row q-col-gutter-xl">
          <!-- left column -->
          <div class="col col-md-6">
            <div class="q-mb-md">
              <q-input
                v-model="$v.form.name.$model"
                label="Name"
                :dense="false"
                :error="isSubmitted && $v.form.name.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.name.required">Name is required</p>
                </template>
              </q-input>
            </div>
            <div class="q-mb-md">
              <q-input
                v-model="$v.form.description.$model"
                label="Description"
                :dense="false"
                type="textarea"
                rows="4"
                :error="isSubmitted && $v.form.description.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.description.required">Description is required</p>
                </template>
              </q-input>
            </div>
            <div class="q-mb-md">
              <q-field
                label="Image"
                stack-label
              >
                <template v-slot:control>
                  <q-img
                    class="cursor-pointer"
                    style="width: 200px; height: 200px; background-color: rgba(0, 0, 0, 0.2)"
                    @click="toggleCroppper"
                    :src="imgDataUrl"
                  />

                  <my-upload
                    langType="en"
                    v-model="isShowCropper"
                    noCircle
                    :width="uploadConfig.width"
                    :height="uploadConfig.height"
                    :url="uploadConfig.url"
                    :field="uploadConfig.field"
                    :headers="uploadConfig.headers"
                    @crop-upload-success="cropUploadSuccess"
                    @crop-upload-fail="cropUploadFail"
                  ></my-upload>
                </template>
              </q-field>
            </div>
          </div>

          <!-- right column -->
          <div class="col col-md-6">
            <div class="q-mb-md">
              <q-select
                v-model="$v.form.client_id.$model"
                :options="clientOptions"
                label="Client"
                :error="isSubmitted && $v.form.client_id.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.client_id.required">Client is required</p>
                </template>
              </q-select>
              <pre>
              </pre>
            </div>
            <div class="q-mb-md">
              <q-input
                type="number"
                v-model="$v.form.estimated_price.$model"
                label="Estimated Price"
                :dense="false"
                :error="isSubmitted && $v.form.estimated_price.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.estimated_price.required">Estimated Price is required</p>
                </template>
              </q-input>
            </div>
            <div class="q-mb-md">
              <q-input
                v-model="form.sku"
                label="SKU"
                :dense="false"
                type="tel"
              />
            </div>
            <div class="q-mb-md">
              <q-select
                v-model="$v.form.category_id.$model"
                :options="productOptions"
                label="Category"
                :error="isSubmitted && $v.form.category_id.$error"
              >
                <template v-slot:error>
                  <p v-if="!$v.form.category_id.required">Category is required</p>
                </template>
              </q-select>
            </div>
            <!-- TODO: status here kalau edit, kayanya ga usah -->
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions
        align="between"
        class="bg-white text-teal"
      >
        <q-btn
          label="Delete"
          icon="delete"
          color="negative"
          self="left"
          flat
          @click="onDelete"
        />
        <div>
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
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
/* eslint quote-props: 0 */
import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import myUpload from 'vue-image-crop-upload';
import token from '../../_helper/token.helper';
import { productService } from '../../_services';

export default {
  // name: 'ComponentName',
  components: {
    'my-upload': myUpload,
  },
  beforeMount() {
    this.form = { ...this.formDataObj };
    this.imgDataUrl = this.formDataObj.image;
  },
  props: ['isShowForm', 'actionType', 'formDataObj'],
  data() {
    return {
      isSubmitting: false,
      isSubmitted: false,
      form: {},
      isShowCropper: false,
      uploadConfig: {
        url: `${process.env.API_BASE}/upload/product`,
        field: 'image',
        headers: {
          'Authorization': token.get(),
        },
        width: 400,
        height: 400,
      },
      imgDataUrl: '',
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
      estimated_price: {
        required,
      },
      client_id: {
        required,
      },
      category_id: {
        required,
      },
    },
  },
  methods: {
    toggleCroppper() {
      this.isShowCropper = !this.isShowCropper;
    },
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
      }
    },
    onDelete() {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: `Hapus produk ${this.form.name} ?`,
        cancel: {
          label: 'Batal',
          flat: true,
          color: 'teal',
        },
        ok: {
          label: 'Ya',
          flat: true,
          color: 'teal',
        },
        persistent: true,
      }).onOk(() => {
        this.deleteProduct();
      });
    },
    async deleteProduct() {
      try {
        const result = await productService.remove(this.form.id);
        if (result) {
          this.$emit('refetch');
          this.toggleModal();
          this.$q.notify({ color: 'positive', message: 'Hapus product berhasil', position: 'top-right' });
        }
      } catch (e) {
        let errMsg = 'Gagal menghapus data';

        if (typeof e === 'string') {
          errMsg = e;
        }

        this.$q.notify({ color: 'negative', message: errMsg, position: 'top-right' });
      }
    },
    cropUploadSuccess(jsonData) {
      this.imgDataUrl = jsonData.image_path;
    },
    cropUploadFail() {
      this.$q.notify({ color: 'negative', message: 'Please check again, expected image size is 400 x 400', position: 'top-right' });
    },
  },
  computed: {
    ...mapGetters('category', ['productOptions']),
    ...mapGetters('client', ['clientOptions']),
  },
};
</script>

<style>
</style>
