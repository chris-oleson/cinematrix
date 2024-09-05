<template>
    <v-app>
        <TopBar/>
        <v-main class="picture">
            <router-view/>
            <v-snackbar v-model="showNotification" :color="store.notification.color" transition="slide-y-transition" timeout="3000">{{ store.notification.text }}</v-snackbar>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from '/src/pinia'
const store = useStore()
import { useTheme } from 'vuetify'
const theme = useTheme()
import TopBar from '/src/components/TopBar'

theme.global.name.value = 'dark'

// Handling notifications
const showNotification = ref(false)
watch(() => store.notification, () => {
    if (store.notification.text) {
        showNotification.value = true
    }
})
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
</style>