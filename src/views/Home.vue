<template>
    <div class="text-center pa-8 container">
        <h1 class="text-h2 text-white">Cinematrix</h1>
        <h2 class="font-weight-light my-8 text-white">All of film at your fingertips</h2>
        <v-text-field v-model="query" variant="solo" theme="light" label="Search movies" append-inner-icon="mdi-magnify" @keyup.enter="search()" @click:append-inner="search" class="mx-auto" max-width="800px"></v-text-field>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const query = ref('')

function search() {
    router.push('/search?q=' + query.value)
}
</script>

<style scoped>
.container {
    height: 80%;
    align-content: center;
}
</style>