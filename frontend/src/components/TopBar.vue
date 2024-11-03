<template>
    <v-app-bar flat class="bg-transparent">
        <router-link v-if="route.path != '/'" class="mx-4 d-inline-flex align-center" to="/">
            <img src="/src/assets/logo.png" height="40" width="40" alt="Cinematrix logo"/>
            <h2 class="font-weight-light ml-2 shadow">Cinematrix</h2>
        </router-link>

        <v-spacer/>

        <!-- Desktop display -->
        <template v-if="!xs">
            <v-btn class="font-weight-light shadow" variant="plain" to="/">Home</v-btn>
            <v-btn v-if="store.isLoggedIn" class="font-weight-light shadow" variant="plain" to="/favorites?p=1">Favorites</v-btn>
            <v-btn v-if="store.isLoggedIn" class="font-weight-light mr-4 shadow" variant="plain" @click="logOut()">Log Out</v-btn>
            <v-btn v-if="!store.isLoggedIn" class="font-weight-light shadow" variant="plain" to="/login">Log In</v-btn>
            <v-btn v-if="!store.isLoggedIn" class="font-weight-light mr-4 shadow" variant="plain" to="/signup">Sign Up</v-btn>
        </template>

        <!-- Mobile display -->
        <v-menu v-if="xs" offset-y close-on-click transition="slide-y-transition" nudge-bottom='24'>
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-menu" class="mr-2" v-bind="props"/>
            </template>
            <v-list class="font-weight-light pa-0 bg-white" width="200">
                <v-list-item to="/">Home</v-list-item>
                <v-list-item to="/search">Search</v-list-item>
                <v-list-item v-if="store.isLoggedIn" to="/favorites?p=1">Favorites</v-list-item>
                <v-list-item v-if="store.isLoggedIn" @click="logOut()">Log Out</v-list-item>
                <v-list-item v-if="!store.isLoggedIn" to="/login">Log In</v-list-item>
                <v-list-item v-if="!store.isLoggedIn" to="/signup">Sign Up</v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script setup>
import axios from 'axios'
import { useStore } from '/src/pinia'
const store = useStore()
import { useDisplay } from 'vuetify'
const { xs } = useDisplay()
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

function logOut() {
    axios.post('auth/logout').then(() => {
        router.push('/')
        store.$reset()
    })
}
</script>
