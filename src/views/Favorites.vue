<template>
    <h1 class="text-center font-weight-light shadow">Favorites</h1>
    <div class="ma-8 d-flex flex-wrap">
        <div v-for="(movie, i) in getSlice(store.favorites)" v-bind:key="i" class="ma-4" style="max-width: 150px">
            <img :src=movie.poster width="100%" draggable="false" class="poster" @click="router.push('/movie/' + movie.imdb_id)">
            <div class="text-center shadow">
                {{ movie.title }} ({{ movie.year }})
                <v-btn icon="mdi-star" variant="plain" density="compact" @click="unfavorite(movie.imdb_id)"></v-btn>
            </div>
        </div>
    </div>
    <div v-if="!store.favorites.length" class="text-center font-weight-light">You have not added any favorites</div>
    <div v-else class="d-flex justify-center align-center ma-8">
        <v-btn variant="plain" icon="mdi-menu-left" :disabled="route.query.p == 1" @click="goToPage(parseInt(route.query.p) - 1)"></v-btn>
        <div class="font-weight-light">Page {{ route.query.p }}</div>
        <v-btn variant="plain" icon="mdi-menu-right" :disabled="store.favorites.length / parseInt(route.query.p) < 10" @click="goToPage(parseInt(route.query.p) + 1)"></v-btn>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useStore } from '/src/pinia'
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

axios.get('/favorites').then((resp) => {
    store.favorites = resp.data
})

function goToPage(page) {
    router.push(`/favorites?p=${page}`)
}

function getSlice(array) {
    let page = parseInt(route.query.p)
    let start = 10 * (page - 1)
    let end = 10 + start

    return array.slice(start, end)
}

async function unfavorite(id) {
    await axios.delete('favorites/' + id)
    const resp = await axios.get('/favorites')
    store.favorites = resp.data
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