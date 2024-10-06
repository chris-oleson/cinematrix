import { Router } from 'express'
const router = Router()
import axios from 'axios'
const omdb = 'http://www.omdbapi.com/?apikey=' + process.env.OMDB_API_KEY

// Search api
router.get('/search', async (req, res) => {
    const results = await axios.get(`${omdb}&s=${req.query.query}&page=${req.query.page}`)
    res.send(results.data).status(200)
})

// IMDB ID lookup
router.get('/:id', async (req, res) => {
    const movie = await axios.get(omdb + '&i=' + req.params.id)
    res.send(movie.data).status(200)
})

export default router
