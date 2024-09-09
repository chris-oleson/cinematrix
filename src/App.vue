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
import { useStore } from '/src/pinia'
const store = useStore()
import TopBar from '/src/components/TopBar'

theme.global.name.value = 'dark'

// Make sure there's an active session
checkSession()
function checkSession() {
    if (store.isLoggedIn) {
        axios.post('auth/check-session').catch(() => {
            store.$reset()
            router.push('/login')
        })
    }
}
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