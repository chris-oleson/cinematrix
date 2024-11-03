This is a simple application for looking up movies and building a collection of favorites.
If you'd like to host this project yourself, use the following instructions:

For the frontend, the root folder should be set to /frontend.
- You will need the following .env variable on the frontend:
  - VITE_URL  The domain name of the backend to concatenate with API calls.
- The front end should be run on Node version 22.6.0 or higher for best results.
- If hosting on a static site platform, you will need to add a Rewrite rule to funnel everything through the index.html file.
  - The rewrite source should be /*
  - The rewrite destination should be /index.html

For the backend, the root folder should be set to /backend.
- You will need the following .env variable on the backend:
  - OMDB_API_KEY  The api key for linking to the OMDB service for looking up movie data.
  - PRODUCTION_ORIGIN  The domain name of the frontend to allow cross origin requests.
  - SESSION_SECRET  For encrypting user sessions; not very important for this type of application.

The database is SQLite, so you can just reuse the sqlite.db file in the backend folder.
