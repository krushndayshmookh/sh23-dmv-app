<template>
  <q-page class="q-ma-sm">
    <div v-if="swi" class="row q-col-gutter-md">
      <div class="col-12">
        <q-card class="bg-white" flat bordered>
          <q-item flat bordered class="bg-white">
            <q-item-section>
              <div class="text-h6">
                {{ swi.name }}
              </div>
            </q-item-section>
            <q-item-section side>
              <q-btn flat dense round icon="star_outline" />
            </q-item-section>
          </q-item>

          <q-list bordered separator class="rounded-borders">
            <q-expansion-item label="Steps" icon="arrow_forward">
              <q-card>
                <q-card-section>
                  <q-list bordered class="rounded-borders">
                    <q-item
                      v-for="item in displayableList"
                      :key="item.id"
                      :inset-level="item.level"
                    >
                      <q-item-section side>
                        <q-icon :name="item.icon" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ item.value }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item label="Parts" icon="category">
              <q-card>
                <q-card-section>
                  <q-list bordered class="rounded-borders">
                    <q-item v-for="part in swi.parts" :key="part">
                      <q-item-section>
                        <q-item-label>{{ part }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item label="Tools" icon="build">
              <q-card>
                <q-card-section>
                  <q-list bordered class="rounded-borders">
                    <q-item v-for="tool in swi.tools" :key="tool">
                      <q-item-section>
                        <q-item-label>{{ tool }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item label="Skills" icon="architecture">
              <q-card>
                <q-card-section>
                  <q-list bordered class="rounded-borders">
                    <q-item v-for="skill in swi.skills" :key="skill">
                      <q-item-section>
                        <q-item-label>{{ skill }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item label="Frequency" icon="update">
              <q-card>
                <q-card-section>
                  {{ swi.frequency }}
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <!-- <pre>{{ swi }}</pre> -->
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'

import { useQuasar } from 'quasar'

import { api, fetcher } from 'boot/axios'

import useSWRV from 'swrv'

import { useRoute } from 'vue-router'

import { useGeneralStore } from 'stores/general'

const NODE_ICON_MAP = {
  MEActivity: 'build',
  SSP0WorkCardRevision: 'assignment',
}

export default defineComponent({
  setup() {
    const route = useRoute()

    const swiId = ref(route.params.id)

    const $q = useQuasar()

    const generalStore = useGeneralStore()
    generalStore.showBack = true

    const { data: swi, error: swiError } = useSWRV(
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

    const loading = computed(() => {
      return !swi.value && !swiError.value
    })

    const createListFromTreeData = (treeData, list, level = 0) => {
      for (const node of treeData) {
        node.level = level
        node.icon = NODE_ICON_MAP[node.type]
        list.push(node)
        if (node.children) {
          createListFromTreeData(node.children, list, level + 0.5)
        }
      }
    }

    const displayableList = computed(() => {
      const list = []
      if (swi.value) {
        createListFromTreeData(swi.value.tree, list)
      }
      return list
    })

    const tab = ref('steps')

    return {
      swi,
      loading,
      tab,
      displayableList,
    }
  },
})
</script>
