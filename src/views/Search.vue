<template>
    <div class="text-center mx-4">
        <v-text-field v-model="query" density="compact" variant="solo" theme="light" hide-details label="Search movies" append-inner-icon="mdi-magnify" style="box-shadow: 3px 3px 8px black;" @keyup.enter="search" @click:append-inner="search" class="mx-auto" max-width="800px"></v-text-field>
    </div>
    <div class="ma-16 d-flex">
        <div v-for="movie in store.apiResponse" v-bind:key="movie" class="ma-4" style="max-width: 150px">
            <img :src=movie.Poster width="100%" draggable="false" class="poster" @click="router.push('/movie/' + movie.imdbID)">
            <div class="text-center shadow">{{ movie.Title }} ({{ movie.Year }})</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '/src/pinia'
const store = useStore()
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const query = ref(route.query.q)
if (route.query.q) {
    search()
}

function search() {
    router.push('/search?q=' + query.value)
}
</script>

<style scoped>
.poster {
    transition-duration: 200ms;
    box-shadow: 3px 3px 8px black;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.03);
        box-shadow: 6px 6px 16px black;
    }
}
</style>