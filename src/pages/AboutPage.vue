<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <div class="text-h4 text-center text-teal">Team SaaS CreatoR</div>
      </div>

      <div class="col-12 text-center">
        <q-img src="/team.png" class="team-img">
          <div class="absolute-bottom text-subtitle1 text-center">
            Made with love within 36 hours!
          </div>
        </q-img>
      </div>
      <div class="col-12 justify-center items-center">
        <div class="text-h6 text-center text-cyan-9 text-weight-bold">
          Team Members
        </div>

        <div
          class="q-pa-md text-body1 text-center"
          style="max-width: 350px; margin-left: auto; margin-right: auto"
        >
          <q-list dense bordered padding class="rounded-borders">
            <q-item clickable v-ripple v-for="person in people" :key="person">
              <q-item-section> {{ person }} </q-item-section>
            </q-item>
          </q-list>
        </div>
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

    let people = [
      'Akanksha Bharambe',
      'Akshada Karade',
      'Ganesh Neema',
      'Krushn Dayshmookh',
      'Nikhil Patil',
      'Omkar Kale',
    ]

    return {
      people,
    }
  },
})
</script>

<style lang="scss">
.team-img {
  max-width: 50vw;
  border-radius: 8px;
  transition: all 0.18s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
