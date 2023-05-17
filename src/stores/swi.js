import { defineStore } from 'pinia'

export const useSWIStore = defineStore('SWI', {
  state: () => ({
    savedSWIs: [],
    cachedSWIs: {},
  }),
  persist: true,

  actions: {
    addSWIToCache(swi) {
      this.cachedSWIs[swi.id] = swi
    },

    addSWIToSaved(swiId) {
      this.savedSWIs.push(swiId)
    },

    removeSWIFromSaved(swiId) {
      this.savedSWIs = this.savedSWIs.filter(id => id !== swiId)
    },
  },

  getters: {
    getSWIById(state) {
      return swiId => state.cachedSWIs[swiId]
    },

    isSaved(state) {
      return swiId => state.savedSWIs.includes(swiId)
    },
  },
})
