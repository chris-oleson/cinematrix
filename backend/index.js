import express from 'express'
import session from 'express-session'
import { rateLimit } from 'express-rate-limit'
const app = express()

// CORS stuff
import cors from 'cors'
var corsOptions = {
    origin: process.env.PRODUCTION_ORIGIN,
    credentials: true,
}
app.use(cors(corsOptions))

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 200, // Requests per minute
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})
app.use(limiter)
app.set('trust proxy', 3)

// Parsing data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Set up session data
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'lax'
        },
    })
)

// Authenticates requests
app.use(checkAuthenticated)
function checkAuthenticated(req, res, next) {
    if (req.session.user || req.path.slice(0, 5) == '/auth' || req.path.slice(0, 5) == '/omdb') {
        next()
    } else {
        res.sendStatus(401)
    }
}

// Registered routes
import auth from './routes/auth.js'
app.use('/auth', auth)
import favorites from './routes/favorites.js'
app.use('/favorites', favorites)
import omdb from './routes/omdb.js'
app.use('/omdb', omdb)

app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT)
})
