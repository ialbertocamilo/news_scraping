<template>
  <CardNews
    v-for="(item,index) in items"
    :key="index"
    :title="item.title"
    :subtitle="item.source_title"
    :text="item.content"
    :img="item.img"
    :link="item.link"
    :obj="item"
  />

</template>


<script setup>
import CardNews from "components/CardNews.vue";
import {api} from "boot/axios";
import {ref} from "vue";


const items = ref([])
api.get("/rest/news/favorites/get").then(({data}) => {
  if (data)
    items.value = data.Items
})

</script>
