/* eslint-disable */
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>Quasar App</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Navigation</q-item-label>

        <q-item v-for="nav in navs" :key="nav.label" :to="nav.pathTo" exact clickable>
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
import { openURL } from 'quasar';

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
          label: 'Voucher',
          icon: 'confirmation_number',
          pathTo: '/voucher',
        },
      ],
    };
  },
  methods: {
    openURL,
  },
};
</script>

<style>
</style>
