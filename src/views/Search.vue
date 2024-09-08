<template>
    <div class="text-center ma-8">
        <v-text-field v-model="query" variant="solo" theme="light" hide-details label="Search movies" append-inner-icon="mdi-magnify" style="box-shadow: 3px 3px 8px black;" @keyup.enter="search(query, 1)" @click:append-inner="search(query, 1)" class="mx-auto" max-width="700px"></v-text-field>
    </div>
    <div class="mx-8 d-flex flex-wrap">
        <div v-for="(movie, i) in results.Search" v-bind:key="i" class="ma-4" style="max-width: 150px">
            <img :src="movie.Poster == 'N/A' ? noImage : movie.Poster" width="100%" draggable="false" class="poster" @click="router.push('/movie/' + movie.imdbID)">
            <div class="text-center shadow">{{ movie.Title }} ({{ movie.Year }})</div>
        </div>
    </div>
    <div v-if="results.Search != null" class="d-flex justify-center align-center ma-8">
        <v-btn variant="plain" icon="mdi-menu-left" :disabled="route.query.p == 1" @click="search(route.query.q, parseInt(route.query.p) - 1)"></v-btn>
        <div class="font-weight-light">Page {{ route.query.p }}</div>
        <v-btn variant="plain" icon="mdi-menu-right" :disabled="parseInt(results.totalResults) / parseInt(route.query.p) < 10" @click="search(route.query.q, parseInt(route.query.p) + 1)"></v-btn>
    </div>
</template>

<script setup>
import noImage from '/src/assets/unavailable.png'
import { ref, watch } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const query = ref(route.query.q)
const results = ref({})

if (route.query.q) {
    search(route.query.q, route.query.p)
}

// Performs new search when page changes
watch(() => route.query, () => {
    if (route.query.p && route.query.q) {
        query.value = route.query.q
        search(route.query.q, route.query.p)
    }
    else {
        results.value = {}
        query.value = ''
    }
})

async function search(query, pageNumber) {
    router.push(`search?q=${query}&p=${pageNumber}`)
    const resp = await axios.get('omdb/search', {
        params: {
            query: query,
            page: pageNumber
        }
    })
    results.value = resp.data
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