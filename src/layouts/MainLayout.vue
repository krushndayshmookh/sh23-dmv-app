<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-show="showBack"
          flat
          dense
          round
          icon="keyboard_arrow_left"
          aria-label="Back"
          @click="$router.back"
        />

        <q-toolbar-title> SWI-FT </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
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
