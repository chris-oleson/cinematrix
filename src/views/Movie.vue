<template>
    <div class="mx-4 my-16 d-flex flex-wrap justify-center">
        <img :src="store.apiResponse[0].Poster" class="ma-4" style="box-shadow: 3px 3px 8px black;">
        <div class="ma-4 shadow" style="width: 700px;">
            <div class="d-flex">
                <h1>{{ store.apiResponse[0].Title }} ({{ store.apiResponse[0].Year }})</h1>
                <v-tooltip :text="getTooltip()" content-class="bg-transparent" offset="0">
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
                    <div>{{ store.apiResponse[0].Director }}</div>
                    <div>{{ store.apiResponse[0].Writer }}</div>
                    <div>{{ store.apiResponse[0].Actors }}</div>
                    <div>{{ store.apiResponse[0].Runtime }}</div>
                    <div>{{ store.apiResponse[0].Rated }}</div>
                    <div>{{ store.apiResponse[0].Language }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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

const favorite = ref(false)

function favoriteClick() {
    if (favorite.value) {
        favorite.value = false
    }
    else {
        favorite.value = true
    }
}

const getTooltip = () => {
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
}
</script>