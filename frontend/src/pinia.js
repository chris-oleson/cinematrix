import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
    state: () => ({
        isLoggedIn: false,
        favorites: [],
    }),
    
    persist: true,
})