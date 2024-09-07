<template>
    <h1 class="text-center font-weight-light shadow">Favorites</h1>
    <div class="ma-16 d-flex">
        <div v-for="movie in store.favorites" v-bind:key="movie" class="ma-4" style="max-width: 150px">
            <img :src=movie.poster width="100%" draggable="false" class="poster" @click="router.push('/movie/' + movie.imdb_id)">
            <div class="text-center shadow">{{ movie.title }} ({{ movie.year }})</div>
        </div>
    </div>
    <div v-if="!store.favorites.length" class="text-center font-weight-light">You have not added any favorites</div>
</template>

<script setup>
import { useStore } from '/src/pinia'
const store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()
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