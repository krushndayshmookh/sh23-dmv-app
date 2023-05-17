<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-show="showBack"
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Back"
          @click="$router.back"
        />
        <div class="q-pa-md">
          <q-toolbar class="bg-primary glossy text-white">
            <q-avatar>
              <img src="public\app_icon.png" />
            </q-avatar>
            <q-toolbar-title>SWI-FT</q-toolbar-title>
          </q-toolbar>
        </div>

        <q-btn
          v-if="!$route.path.includes('about')"
          flat
          dense
          align="right"
          icon="info"
          aria-label="About"
          to="/about"
          label="About Us"
        >
          <q-tooltip> About </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useGeneralStore } from 'stores/general'

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const generalStore = useGeneralStore()

    const showBack = computed(() => generalStore.showBack)

    return {
      showBack,
    }
  },
})
</script>
