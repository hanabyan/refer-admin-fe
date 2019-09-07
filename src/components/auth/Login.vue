<template>
  <q-layout
    ref="layout"
    class="row justify-center items-center"
  >
    <q-card
      class="my-card login-card"
      flat
      bordered
    >
      <q-card-section>
        <p class="text-h4">Sign In</p>
      </q-card-section>

      <q-separator inset />
<q-form
  @submit.prevent="handleSubmit"
>
      <q-card-section>
        <div class="q-mb-md">
          <q-input
            v-model="$v.email.$model"
            label="Email"
            stack-label
            square
            outlined
            lazy-rules
            :error="isSubmitted && $v.email.$error"
          >
            <template v-slot:error>
              <p v-if="!$v.email.required">Email is required</p>
              <p v-if="!$v.email.email">Invalid email</p>
            </template>
          </q-input>
        </div>
        <div>
          <q-input
            v-model="$v.password.$model"
            label="Password"
            stack-label
            type="password"
            square
            outlined
            :error="isSubmitted && $v.password.$error"
          >
            <template v-slot:error>
              <p v-if="!$v.password.required">Password is required</p>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <p
          v-if="alert.message && alert.type == 'negative'"
          class="text-negative"
        >{{ alert.message }}
        </p>
        <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
        <q-btn label="Login" type="submit" color="primary" class="full-width" :loading="loggingIn"/>
      </q-card-section>

</q-form>
    </q-card>
  </q-layout>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'ComponentLogin',
  data() {
    return {
      email: '',
      password: '',
      isSubmitted: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  computed: {
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    },
    alert() {
      return this.$store.state.alert;
    },
  },
  methods: {
    handleSubmit() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }

      /**
       * email param bellow conflict with vuelidate function, so need to rename
       */
      const { email: inputEmail, password } = this;
      const { dispatch } = this.$store;
      if (email && password) {
        dispatch('authentication/login', { email: inputEmail, password });
      }
    },
    // onReset() {
    //   console.log('reset');
    // },
  },
};
</script>

<style>
  .login-card {
    max-width: 350px;
    min-width: 300px;
  }
</style>
