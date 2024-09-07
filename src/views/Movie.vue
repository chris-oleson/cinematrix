<template>
    <div class="mx-4 my-16 d-flex flex-wrap justify-center">
        <img :src="store.apiResponse[0].Poster" class="ma-4" style="box-shadow: 3px 3px 8px black;">
        <div class="ma-4 shadow" style="width: 700px;">
            <div class="d-flex">
                <h1>{{ store.apiResponse[0].Title }} ({{ store.apiResponse[0].Year }})</h1>
                <v-tooltip :text="getTooltip" content-class="bg-transparent" offset="0">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props">
                            <v-btn :icon="favorite ? 'mdi-star' : 'mdi-star-outline'" variant="plain" :disabled="!store.isLoggedIn" @click="favoriteClick()"></v-btn>
                        </div>
                    </template>
                </v-tooltip>
            </div>
            <div class="my-4">{{ store.apiResponse[0].Plot }}</div>

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
                    <div>{{ director }}</div>
                    <div>{{ writer }}</div>
                    <div>{{ actors }}</div>
                    <div>{{ runtime }}</div>
                    <div>{{ rated }}</div>
                    <div>{{ language }}</div>
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
const title = ref('')
const year = ref(0)
const poster = ref('')

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
            title: title.value,
            year: year.value,
            poster: poster.value,
        })
        favorite.value = true
    }
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