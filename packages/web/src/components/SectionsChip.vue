<template>
  <div class="q-pa-md">
    <q-chip clickable @click="goTo('peruano-politica')" color="primary"  text-color="white" icon="event">
      El Peruano
    </q-chip>
    <q-chip clickable @click="goTo('republica-mundo')" color="red"  text-color="white" icon="bookmark">
      La República
    </q-chip>
    <q-chip clickable @click="goTo('republica-politica')" color="red" text-color="white" icon="bookmark">
      La República - politica
    </q-chip>
    <q-chip clickable @click="goTo('comercio-mundo')" color="orange" text-color="white" >
      El Comercio
    </q-chip>
    <q-chip clickable @click="goTo('comercio-politica')" color="orange" text-color="white" >
      El Comercio politica
    </q-chip>
    <q-chip clickable @click="goTo('gestion-internacional')" color="red-4" text-color="white">
      Gestión
    </q-chip>
    <q-chip clickable @click="goTo('gestion-politica')" color="red-4" text-color="white">
      Gestión politica
    </q-chip>
    <q-chip clickable @click="goTo('bbc-mundo')" color="teal-2" text-color="white" >
      BBC
    </q-chip>
  </div>
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
const emit=defineEmits(["update"])
function goTo(route){
  emit("update",route)
}
</script>
