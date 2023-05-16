import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general', {
  state: () => ({
    showBack: false,
  }),
  persist: true,
})
