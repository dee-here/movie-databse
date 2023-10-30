const express = require('express');
// const path = require('path');
// const fs = require ('fs');

const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');

//parse json and url encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
    //  host: 'localhost',
      user: 'root',
      password: '',
    //  password: 'password',
      database: 'movies_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

// It's done when a `GET` request to the `/api/movies` route renders a list of all movies.

app.get(`/api/movies`, (req, res) => 
    db.query("SELECT * FROM movies;", function(err, result) {
        if(result) {
            console.log(result);
            res.json(result);
        }
        if(err){
            res.json(err);
        }
    })
);

// It's done when a `GET` request to the `/api/movie-reviews` route renders a list of all reviews with movie data.
app.get(`/api/movie-reviews`, (req, res) => {
    db.query("SELECT movie_name, review FROM movies JOIN review ON movies.id = review.movie_id;", (err, result) => {
        if (result) {
            console.log("result ", result);
            res.json(result);
        }
        if(err) {
            console.log('Error: ', err);
            res.json(`Error: ${err}`);
        }
    })
})


// It's done when a `POST` request to the `/api/add-movie` route successfully adds a movie when tested using Insomnia.
app.post('/api/add-movie', (req, res) => {
    const movieToAdd = req.body.movie;
    db.query("INSERT INTO movies (movie_name) VALUES (?);", [movieToAdd], function (err, result) {
        if (result) {
            res.json(`${movieToAdd} was successfully added`);
        }
        if (err) {
            res.json(err);
        }
    })
})


// It's done when a `PUT` request to the `/api/review/:id` route successfully updates a movie review when tested using Insomnia.
app.put(`/api/review/:id`, (req, res) => {
    //console.log("req is: ", req);
    // exytract review and review id from request !!  use that in the query below
    const id = req.params.id;
    const reviewToUpdate = req.body.review;
    //console.log(req, res);
    db.query(`UPDATE review SET review=? WHERE id=?;`, [reviewToUpdate, id], (err, result) => {
        if(err) {
            res.json(`Error : ${err}`);
        }
        if(result) {
            res.json(` Review id: ${id} successfully updated`);
        }
    })
})


// It's done when a `DELETE` request to `/api/movie/:id` route deletes a movie when tested using Insomnia.

app.listen(PORT, () => console.log(`app listening at ${PORT}`));