<template>
    <div class="ma-4 d-flex">
        <img :src="store.apiResponse[0].Poster" class="ma-4" style="box-shadow: 3px 3px 8px black;">
        <div class="ma-4 shadow" style="width: 700px;">
            <div class="d-flex">
                <h1>{{ store.apiResponse[0].Title }} ({{ store.apiResponse[0].Year }})</h1>
                <v-tooltip :text="favorite ? 'Remove from favorites' : 'Add to favorites'">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" :icon="favorite ? 'mdi-star' : 'mdi-star-outline'" variant="plain" @click="favorite = !favorite"></v-btn>
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

const favorite = ref(false)
</script>