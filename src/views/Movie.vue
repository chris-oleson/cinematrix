<template>
    <div class="mx-4 my-16 d-flex flex-wrap justify-center">
        <img :src="movie.Poster" class="ma-4" style="box-shadow: 3px 3px 8px black;">
        <div class="ma-4 shadow" style="width: 700px;">
            <div class="d-flex">
                <h1>{{ movie.Title }} ({{ movie.Year }})</h1>
                <v-tooltip :text="getTooltip" content-class="bg-transparent" offset="0">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props">
                            <v-btn :icon="favorite ? 'mdi-star' : 'mdi-star-outline'" variant="plain" :disabled="!store.isLoggedIn" @click="favoriteClick()"></v-btn>
                        </div>
                    </template>
                </v-tooltip>
            </div>
            <div class="my-4">{{ movie.Plot }}</div>

            <div class="d-flex">
                <div class="font-weight-bold mr-6">
                    <div>Director:</div>
                    <div>Writer:</div>
                    <div>Actors:</div>
                    <div>Runtime:</div>
                    <div>Rated:</div>
                    <div>Language:</div>
                </div>
                <div>
                    <div>{{ movie.Director }}</div>
                    <div>{{ movie.Writer }}</div>
                    <div>{{ movie.Actors }}</div>
                    <div>{{ movie.Runtime }}</div>
                    <div>{{ movie.Rated }}</div>
                    <div>{{ movie.Language }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useStore } from '/src/pinia'
const store = useStore()
import { useRoute } from 'vue-router'
const route = useRoute()

const favorite = ref(false)
const movie = ref({})

getMovie()
async function getMovie() {
    const resp = await axios.get('/omdb/' + route.params.id)
    movie.value = resp.data
}

checkFavorites()
function checkFavorites() {
    if (store.favorites.find((e) => e.imdb_id == route.params.id)) {
        favorite.value = true
    }
}

async function favoriteClick() {
    if (favorite.value) {
        await axios.delete('favorites/' + route.params.id)
        favorite.value = false
    }
    else {
        await axios.post('favorites', {
            imdb_id: route.params.id,
            title: movie.value.Title,
            year: movie.value.Year,
            poster: movie.value.Poster,
        })
        favorite.value = true
    }

    const resp = await axios.get('/favorites')
    store.favorites = resp.data
}

const getTooltip = computed(() => {
    if (store.isLoggedIn) {
        if (favorite.value) {
            return 'Remove from favorites'
        }
        else {
            return 'Add to favorites'
        }
    }
    else {
        return 'Log in to add to favorites'
    }
})
</script>