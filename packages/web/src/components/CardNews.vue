<template>
  <q-card class="q-pa-md q-ma-md  items-start">
    <q-card-section horizontal>
      <q-card-section class="q-ma-none q-pa-xs full-width cursor-pointer" @click="goToPage(prop.link)">
        <q-card-section v-if="prop.img" class="col-5 flex flex-center q-ma-none q-px-none full-width">
          <!--          <q-img-->
          <!--            class="rounded-borders"-->
          <!--            :src="prop.img"-->
          <!--          />-->

          <picture>
            <source :srcset="prop.img" media="(min-width:100px)" type="image/webp"
                    sizes="(max-width: 1008px) 33vw, 321px">
            <q-img
              class="rounded-borders"
              :src="prop.img"
              width="12rem"
            />
          </picture>
        </q-card-section>
        <q-card-section v-if="prop.title" class="q-ma-none q-pa-none text-bold text-h6 text-grey-8 q-mb-md">
          {{ prop.title }}
        </q-card-section>
        <q-card-section class="q-ma-none q-pa-none text-subtitle2 text-caption bg-grey-8 text-white q-px-md q-mb-md">
          {{ prop.subtitle }}
        </q-card-section>
        {{ prop.text }}
        <q-card-section class="q-ma-none q-pa-none text-subtitle2 text-caption text-grey-10 q-pa-none q-ma-none">
          - {{ moment(prop.obj.created_date).calendar() }}
        </q-card-section>
      </q-card-section>

      <q-separator vertical/>

      <q-card-actions vertical class="justify-center items-center text-center">
        <q-btn flat round :color="prop.obj.favorite?'red':'grey'" icon="favorite" @click="addToFavorites"/>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script setup>

import {api} from "boot/axios";
import moment from "moment"

const prop = defineProps({
  title: String,
  subtitle: String,
  text: String,
  img: String,
  link: String,
  obj: Object
})

const emit=defineEmits(['reload'])


function addToFavorites() {
  api.post("/rest/news/favorites/add", {...prop.obj}).then(data => {
    emit('reload')
  })
}

function goToPage(url) {
  window.open(url, "_blank")
}
</script>
