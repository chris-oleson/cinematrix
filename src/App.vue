<template>
    <v-app>
        <TopBar/>
        <v-main class="picture">
            <router-view/>
        </v-main>
    </v-app>
</template>

<script setup>
import axios from 'axios'
import { useTheme } from 'vuetify'
const theme = useTheme()
import TopBar from '/src/components/TopBar'

axios.post('auth/wakeup')
theme.global.name.value = 'dark'
</script>

<style>
/* Removing default link styling */
a {
    color: inherit;
    text-decoration: inherit;
}

.picture {
    background-image: url('/src/assets/background.jpg');
    background-size: cover;
}

.shadow {
    text-shadow: 3px 3px 8px black;
}
</style>