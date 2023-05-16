<template>
  <q-page class="q-ma-md">
    <pre>{{ swi }}</pre>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'

import { useQuasar } from 'quasar'

import { api, fetcher } from 'boot/axios'

import useSWRV from 'swrv'

import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()

    const swiId = ref(route.params.id)

    const $q = useQuasar()

    const swi = useSWRV(
      () => '/swi/' + swiId.value,
      fetcher,
      {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          if (error.status === 404) return
          if (retryCount >= 10) return
          setTimeout(() => revalidate({ retryCount }), 5000)
        },
      }
    )

    // const fetchSWI = () => {
    //   $q.loading.show()
    //   api
    //     .get('/swi/' + swiId.value)
    //     .then(res => {
    //       swi.value = res.data
    //     })
    //     .finally(() => {
    //       $q.loading.hide()
    //     })
    // }

    // onMounted(() => {
    //   fetchSWI()
    // })

    return {
      swi,
      // fetchSWI,
    }
  },
})
</script>
