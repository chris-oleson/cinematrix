<template>
    <div class="mx-auto text-center container" style="width:300px">
        <v-progress-circular v-if="loading" class="mt-4 mx-auto d-block" indeterminate></v-progress-circular>
        <v-card-text v-else-if="error && route.query.t" class="text-error pa-0 mt-4">{{ errorMessage }}</v-card-text>
        <template v-else>
            <v-text-field id="username" variant="underlined" label="Username" v-model="username" :error="error"/>
            <v-text-field id="password" :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" variant="underlined" label="Password" :type="showPassword ? 'text' : 'password'" v-model="password" :error="error" @click:append="showPassword = !showPassword" @keyup.enter="login"/>
            <v-card-text v-if="error" class="text-error pa-0">{{ errorMessage }}</v-card-text>
            <v-btn width="200" rounded="0" variant="outlined" class="bg-transparent mt-4" @click="login">Log In</v-btn>
            <v-btn v-if="errorMessage == 'This account has not been verified'" width="200" size="small" variant="plain" class="font-weight-light mt-4" @click="resend">Resend Verification</v-btn>
            <v-btn width="200" size="small" variant="plain" class="mt-4 font-weight-light" :to="'/forgot-password?e=' + username">Forgot Password</v-btn>
        </template>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useStore } from '/src/pinia'
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref(false)
const errorMessage = ref('')
const loading = ref(false)

onMounted(() => {
    if (document.getElementById('username')) {
        document.getElementById('username').focus()
    }
})

async function login() {
    loading.value = true
    error.value = false
    try {
        await axios.post('/auth/login', {
            name: username.value,
            password: password.value,
        })
        store.isLoggedIn = true
        router.push('/favorites?p=1')
    }
    catch(err) {
        error.value = true
        errorMessage.value = err.response.data
        loading.value = false
    }
}
</script>

<style scoped>
.container {
    height: 80%;
    align-content: center;
}
</style>