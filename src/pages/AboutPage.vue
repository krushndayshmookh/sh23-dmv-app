<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <div class="text-h4 text-center text-teal">
          About us - Team SaaS CreatoR
        </div>
      </div>

      <div class="col-12 text-center">
        <q-img src="public\team.png" class="team-img">
          <div class="absolute-bottom text-subtitle1 text-center">
            Made with love within 36 hours!
          </div>
        </q-img>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'

import { useGeneralStore } from 'stores/general'

export default defineComponent({
  setup() {
    const generalStore = useGeneralStore()
    generalStore.showBack = true
  },
})
</script>

<style lang="scss">
.team-img {
  max-width: 50vw;
}
</style>
