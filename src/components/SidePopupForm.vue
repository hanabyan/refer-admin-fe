<template>
<!-- this model difficult for validation -->
      <q-form
        @submit.prevent="handleSubmit"
      >
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
          <slot></slot>
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white text-teal"
        >
          <q-btn
            flat
            label="Cancel"
            @click="cancelHandle"
          />
          <q-btn
            type="submit"
            flat
            label="Save"
            @click="saveHandle"
          />
        </q-card-actions>
    </q-card>
  </q-dialog>
      </q-form>
</template>

<script>

export default {
  name: 'SidePopupForm',
  props: ['actionType', 'title'],
  data() {
    return {
      isOpen: false,
      formType: 'create',
    };
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    cancelHandle() {
      this.close();
    },
    saveHandle() {
      console.log(this.$v);
      console.log('save');
    },
  },
};
</script>

<style>
</style>
