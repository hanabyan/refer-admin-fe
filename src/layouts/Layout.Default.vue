/* eslint-disable */
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: #0100CA;">
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>Refer Admin Dashboard</q-toolbar-title>

        <q-btn-dropdown
          flat
          split
          push
          no-caps
          color="white"
        >
          <template v-slot:label>
            <q-item-section>
              <q-item-label>{{ profile && profile.name }}</q-item-label>
              <q-item-label caption class="text-white">{{ profile.email }}</q-item-label>
            </q-item-section>
          </template>

          <div class="row no-wrap q-pa-md">
            <div class="col items-center">
              <q-btn
                flat
                class="full-width"
                color="primary"
                label="Logout"
                push
                size="sm"
                v-close-popup
                @click="logout"
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>
          <img
            alt="Refer logo"
            src="~assets/img/logo.refer.medium.png"
            style="max-height: 40px;"
          >
        </q-item-label>

        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.pathTo"
          exact
          :clickable="!!nav.pathTo"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
/*
TODO: check lagi ketika logout ga nemu profile.name langsung
error di componentnya (lihat console log)
*/
import { openURL } from 'quasar';
import { mapActions } from 'vuex';

export default {
  name: 'Default',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        {
          label: 'Dashboard',
          icon: 'dashboard',
          pathTo: '/',
        },
        {
          label: 'Clients',
          icon: 'business',
          pathTo: '/clients',
        },
        {
          label: 'Product',
          icon: 'list_alt',
          pathTo: '/product',
        },
        {
          label: 'Categories',
          icon: 'category',
          pathTo: '/categories',
        },
        {
          label: 'Promo',
          icon: 'local_offer',
          pathTo: '',
        },
        {
          label: 'Setup',
          icon: '',
          pathTo: '/promo',
        },
        {
          label: 'Featured',
          icon: '',
          pathTo: '/promo/featured',
        },
        {
          label: 'Claim Reward',
          icon: 'card_giftcard',
          pathTo: '/claim-reward',
        },
        {
          label: 'Withdrawal',
          icon: 'monetization_on',
          pathTo: '/withdrawal',
        },
        {
          label: 'Users',
          icon: 'person_pin',
          pathTo: '/users',
        },
        // {
        //   label: 'Voucher',
        //   icon: 'confirmation_number',
        //   pathTo: '/voucher',
        // },
      ],
    };
  },
  methods: {
    openURL,
    ...mapActions('authentication', ['logout']),
  },
  computed: {
    profile() {
      return this.$store.state.authentication.user;
    },
  },
};
</script>

<style>
</style>
