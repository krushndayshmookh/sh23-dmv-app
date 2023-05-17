<template>
  <q-page class="">
    <div>
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
    </div>
    <q-list>
      <q-item-label header dense v-if="!searchQ"> Saved SWI </q-item-label>

      <q-item
        v-for="swi in displayableList"
        :key="swi.id"
        clickable
        :to="'/' + swi.id"
      >
        <q-item-section side>
          <q-btn flat dense round icon="star" color="amber" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ swi.name }}</q-item-label>
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

    const performSearch = () => {
      console.log('Search for: ', searchQ.value)

      if (searchQ.value.length < 3) {
        searchResults.value = []
        return
      }
      api.get('/swi', { params: { search: searchQ.value } }).then(res => {
        searchResults.value = res.data
      })
    }

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
    }
  },
})
</script>
