This is a simple application for looking up movies and building a collection of favorites.
If you'd like to host this project yourself, use the following instructions:

- For the front end, use the respository linked here: https://github.com/chris-oleson/cinematrix-frontend.
    - You will need the following .env variable on the frontend:
        - VITE_URL  The domain name of the backend to concatenate with API calls.
    - The front end should be run on Node version 22.6.0 for best results.
    - If hosting on a static site platform, you will need to add a Rewrite rule to funnel everything through the index.html file.
        - The rewrite source should be /*
        - The rewrite destination should be /index.html

- For the backend, use the repository linked here: https://github.com/chris-oleson/cinematrix-backend.
    - You will need the following .env variable on the backend:
        - DB_HOST  The database IP or address.
        - DB_NAME  The name of the database on the server.
        - DB_PASSWORD  The password to access the database.
        - DB_PORT  The database port on the IP.
        - DB_USER  The username to access the database.
        - OMDB_API_KEY  The api key for linking to the OMDB service for looking up movie data.
        - PRODUCTION_ORIGIN  The domain name of the frontend to allow cross origin requests.
        - SESSION_SECRET  For encrypting user sessions; not very important for this type of application.

- For the database, use the file in this repository titled cinematrix-db-schema.sql.
    - Import the schema into a MySQL database server and you should be all set.