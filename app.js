const express = require('express');
const app = express();
const axios = require('axios');
const Muvi = require('./Movie');
const path = require('path'); //heroku 
const PORT = process.env.PORT || 5000  //heroku 

const key = '39964cd2';

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// //heroku step 3
// if (process.env.NODE_ENV === 'production'){
//   app.use(express.static('client/build'));

//   app.get('*',(req, res)=> {
//       res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); //relative path
//   });
// }

//showmovies
app.get('/showmovie', (req, res) => {
  const title = req.query.title;
    const querystr = `http://www.omdbapi.com/?t=${title}&apikey=${key}`;

axios.get(querystr).then(response => {

    const mv = new Muvi({

      title: response.data.Title,
      lang: response.data.Language,
      rated: response.data.Rated,
      time: response.data.Runtime,
      genre: response.data.Genre,
      act: response.data.Actors,
      plot: response.data.Plot,
      post: response.data.Poster,
      });


      if (!mv.title) {
        res.status(200).json('Not found');
        return;
      }
      mv
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//show all movies
app.get('/showallmovies', (req, res) => {
  Muvi.find({})
    .sort([['_id', -1]])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(400).json(error);
      });
});

//deletemovies
app.get('/deleteMovie', (req, res) => {

    Muvi.deleteMany({title: req.query.title})
      .then(response => {
        res.status(200).json(response);
    })

    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});


