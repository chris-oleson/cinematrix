<template>
    <div class="d-flex align-center justify-center text-center pa-8" style="height:80%">
        <div style="width:700px">
            <div class="d-flex justify-center align-center">
                <img src="/src/assets/logo.png" height="70px">
                <h1 class="text-h2 shadow">Cinematrix</h1>
            </div>
            <h2 class="font-weight-light my-8 shadow">All of film at your fingertips</h2>
            <v-text-field id="search" v-model="query" variant="solo" theme="light" hide-details label="Search movies" append-inner-icon="mdi-magnify" @keyup.enter="search()" @click:append-inner="search" style="box-shadow: 3px 3px 8px black;"></v-text-field>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const query = ref('')

function search() {
    router.push(`/search?q=${query.value}&p=1`)
}
</script>