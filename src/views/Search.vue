<template>
    <div class="text-center pa-8">
        <v-text-field v-model="query" variant="solo" theme="light" label="Search movies" append-inner-icon="mdi-magnify" @keyup.enter="search" @click:append-inner="search" class="mx-auto" max-width="800px"></v-text-field>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const query = ref(route.query.q)

function search() {

}
</script>