<template>
    <div class="ma-4 d-flex">
        <img :src="store.apiResponse[0].Poster" class="ma-4" style="box-shadow: 3px 3px 8px black;">
        <div class="ma-4 shadow">
            <h1>{{ store.apiResponse[0].Title }} ({{ store.apiResponse[0].Year }})</h1>
            <div class="my-4">{{ store.apiResponse[0].Plot }}</div>
            <div class="d-flex">
                <b class="mr-4">Director:</b>
                <div>{{ store.apiResponse[0].Director }}</div>
            </div>
            <div class="d-flex">
                <b class="mr-4">Writer:</b>
                <div>{{ store.apiResponse[0].Writer }}</div>
            </div>
            <div class="d-flex">
                <b class="mr-4">Actors:</b>
                <div>{{ store.apiResponse[0].Actors }}</div>
            </div>
            <div class="d-flex">
                <b class="mr-4">Runtime:</b>
                <div>{{ store.apiResponse[0].Runtime }}</div>
            </div>
            <div class="d-flex">
                <b class="mr-4">Rated:</b>
                <div>{{ store.apiResponse[0].Rated }}</div>
            </div>
            <div class="d-flex">
                <b class="mr-4">Language:</b>
                <div>{{ store.apiResponse[0].Language }}</div>
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
</script>