<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-mb-md">
      <div v-if="!searchQ">
        <div class="text-h4 text-center text-teal q-mt-md">
          Welcome to SWIFT
        </div>
        <div class="text-subtitle1 text-center text-italic text-green">
          SWI for Technicians
        </div>

        <div class="text-subtitle1 text-center text-indigo-8">
          Simplified Work Instructions, Amplified Productivity!
        </div>
      </div>

      <div class="q-ma-md">
        <q-input
          outlined
          class="q-bg-red"
          placeholder="Search SWI"
          dense
          v-model="searchQ"
          @keyup="performSearch"
          clearable
          @clear="resetSearch"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </q-card>

    <q-list v-if="searchLoading">
      <q-item v-for="i in 4" :key="i">
        <q-item-section avatar>
          <q-skeleton type="QRadio" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-card
      flat
      bordered
      class=""
      v-if="searchEmpty && !displayableList.length"
    >
      <q-card-section class="text-center">
        <q-icon size="128px" color="grey-4" name="search_off" />
      </q-card-section>

      <q-card-section>
        <q-item-label class="text-center" caption>
          No results found
        </q-item-label>
      </q-card-section>
    </q-card>

    <q-list
      v-if="!searchLoading && displayableList.length"
      bordered
      class="bg-white rounded-borders"
    >
      <q-item-label header dense v-if="!searchQ"> Saved SWI </q-item-label>

      <q-item
        v-for="swi in displayableList"
        :key="swi.id"
        clickable
        :to="'/' + swi.id"
      >
        <q-item-section side>
          <q-btn
            flat
            dense
            round
            :icon="swi.saved ? 'star' : 'category'"
            :color="swi.saved ? 'amber' : 'grey'"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ swi.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

import { useQuasar } from 'quasar'

import { api } from 'boot/axios'

import { useGeneralStore } from 'stores/general'
import { useSWIStore } from 'stores/swi'

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const $q = useQuasar()

    const generalStore = useGeneralStore()
    const swiStore = useSWIStore()

    generalStore.showBack = false

    const searchQ = ref('')
    const searchResults = ref([])
    const searchLoading = ref(false)

    const performSearch = () => {
      console.log('Search for: ', searchQ.value)

      if (searchQ.value.length < 3) {
        searchResults.value = []
        return
      }
      searchLoading.value = true
      api
        .get('/swi', { params: { search: searchQ.value } })
        .then(res => {
          searchResults.value = res.data
        })
        .finally(() => {
          searchLoading.value = false
        })
    }

    const searchEmpty = computed(
      () => !searchLoading.value && !searchResults.value.length
    )

    const savedSWIIds = computed(() => swiStore.savedSWIs)

    const savedSWIData = computed(() =>
      savedSWIIds.value.map(id => ({ ...swiStore.getSWIById(id), saved: true }))
    )

    const displayableList = computed(() => {
      if (searchQ.value.length > 0) {
        return searchResults.value
      }
      return savedSWIData.value
    })

    const resetSearch = () => {
      searchQ.value = ''
    }

    return {
      searchQ,
      performSearch,
      displayableList,
      resetSearch,
      searchLoading,
      searchEmpty,
    }
  },
})
</script>
