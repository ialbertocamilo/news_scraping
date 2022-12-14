<template>
  <div class="text-center q-mt-lg">
    <SectionsChip @update="updateNewsFilter"/>
  </div>
  <div class="text-center q-mt-lg">
    <span class="text-h4 text-grey-8 text-bold self-center justify-center">Hoy</span>
  </div>
  <CardNews
    v-for="(item,index) in items"
    :key="index"
    :title="item.title"
    :subtitle="item.source_title"
    :text="item.content"
    :img="item.img"
    :link="item.link"
    :obj="item"
    @reload="reload()"
  />

</template>

<script setup>


import CardNews from "components/CardNews.vue";
import {api} from "boot/axios";
import {onMounted, ref} from "vue";
import {useQuasar} from "quasar";
import SectionsChip from "components/SectionsChip.vue";


const items = ref([])
const $q = useQuasar()

$q.loadingBar.setDefaults({
  color: 'yellow',
  size: '8px',
})
onMounted(() => {
  $q.loadingBar.start()
})

api.get("/rest/news/get").then(({data}) => {
  if (data)
    items.value = data.Items

  $q.loadingBar.stop()
})

function updateNewsFilter(data) {
  api.get("/rest/news/get?source_filter=" + data).then(({data}) => {
    if (data)
      items.value = data.Items

    $q.loadingBar.stop()
  })
}

function reload() {
  api.get("/rest/news/get").then(({data}) => {
    if (data)
      items.value = data.Items

    $q.loadingBar.stop()
  })
}
</script>
