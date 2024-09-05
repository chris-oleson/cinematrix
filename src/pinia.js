import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('store', {
    state: () => ({
        name: '',
        isLoggedIn: false,
        notification: {
            text: '',
            color: ''
        },
    }),

    getters: {

    },

    actions: {

    },
    
    persist: true,
})