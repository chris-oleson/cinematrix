<template>
    <div class="mx-auto text-center container" style="width:300px">
        <v-progress-circular v-if="loading" class="mt-4 mx-auto d-block" indeterminate></v-progress-circular>
        <template v-else>
            <v-text-field id="name" variant="underlined" label="Username" :error="error" v-model="name"/>
            <v-text-field :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" variant="underlined" label="Password" :type="showPassword ? 'text' : 'password'" v-model="password" :error="error" @click:append="showPassword = !showPassword"/>
            <v-text-field :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" variant="underlined" label="Confirm Password" :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" :error="error" @click:append="showConfirmPassword = !showConfirmPassword" @keyup.enter="createAccount"/>
            <v-card-text v-if="error" class="text-error pa-0">{{ errorMessage }}</v-card-text>
            <v-btn v-if="errorMessage == 'This email already exists'" width="200" size="small" rounded="0" class="bg-error mt-4" to="/forgot-password">Forgot Password?</v-btn>
            <v-btn width="200" rounded="0" variant="outlined" class="bg-transparent mt-4" @click="createAccount">Create Account</v-btn>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const name = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const error = ref(false)
const errorMessage = ref('')
const loading = ref(false)
import { useRouter } from 'vue-router'
const router = useRouter()
import { useStore } from '/src/pinia'
const store = useStore()

onMounted(() => {
    document.getElementById('name').focus()
})

function createAccount() {
    if (password.value != confirmPassword.value) {
        errorMessage.value = 'Passwords do not match'
        error.value = true
    }
    else {
        loading.value = true
        axios.post('/auth/create', {
            name: name.value,
            password: password.value,
        })
        .then(() => {
            store.isLoggedIn = true
            router.push('/')
        })
        .catch((err) => {
            errorMessage.value = err.response.data
            error.value = true
            loading.value = false
        })
    }
}
</script>

<style scoped>
.container {
    height: 80%;
    align-content: center;
}
</style>