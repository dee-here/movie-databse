const express = require('express');
// const path = require('path');
const fs = require ('fs');

const PORT = process.env.PORT || 3001;
const app = express();

//parse json and url encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// It's done when a `GET` request to the `/api/movies` route renders a list of all movies.

// It's done when a `GET` request to the `/api/movie-reviews` route renders a list of all reviews with movie data.

// It's done when a `POST` request to the `/api/add-movie` route successfully adds a movie when tested using Insomnia.

// It's done when a `PUT` request to the `/api/review/:id` route successfully updates a movie review when tested using Insomnia.

// It's done when a `DELETE` request to `/api/movie/:id` route deletes a movie when tested using Insomnia.