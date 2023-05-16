import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general', {
  state: () => ({
    showBack: false,
  }),
  persist: true,
  getters: {
    showBack: state => state.showBack,
  },
  actions: {
    setShowBack(value) {
      this.showBack = value
    },
  },
})
