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

        apiResponse: [{
            "Title":"Dune",
            "Year":"1984",
            "Rated":"PG-13",
            "Released":"14 Dec 1984",
            "Runtime":"137 min",
            "Genre":"Action, Adventure, Sci-Fi",
            "Director":"David Lynch",
            "Writer":"Frank Herbert, David Lynch",
            "Actors":"Kyle MacLachlan, Virginia Madsen, Francesca Annis",
            "Plot":"A Duke's son leads desert warriors against the galactic emperor and his father's evil nemesis to free their desert world from the emperor's rule.",
            "Language":"English",
            "Country":"United States, Mexico",
            "Awards":"Nominated for 1 Oscar. 2 wins & 6 nominations total",
            "Poster":"https://m.media-amazon.com/images/M/MV5BYTAzYzNlMDMtMGRjYS00M2UxLTk0MmEtYmE4YWZiYmEwOTIwL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_SX300.jpg",
            "Ratings":[
                {
                    "Source":"Internet Movie Database",
                    "Value":"6.3/10"
                },
                {
                    "Source":"Rotten Tomatoes",
                    "Value":"37%"
                },
                {
                    "Source":"Metacritic",
                    "Value":"41/100"
                }
            ],
            "Metascore":"41",
            "imdbRating":"6.3",
            "imdbVotes":"182,211",
            "imdbID":"tt0087182",
            "Type":"movie",
            "DVD":"N/A",
            "BoxOffice":"$30,925,690",
            "Production":"N/A",
            "Website":"N/A",
            "Response":"True"
        }]
    }),

    getters: {

    },

    actions: {

    },
    
    persist: true,
})