const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3001;

require("dotenv").config();
const googleAPI = process.env.GoogleBooksAPI;

const path = require("path");
app.use(express.static(path.join(__dirname, 'client/build')));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

app.get("/search/:searchTerm", (req, res)=>{
  // console.log(googleAPI);
  // console.log(req.params.searchTerm);
  if (req.params.searchTerm=="") res.json([]);
  else{
    axios.get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: req.params.searchTerm,
        maxResults: 20,
        orderBy : "relevance",
        apiKey : googleAPI
      }
    }).then(response => {
      let item = response.data.items;
      let results = [];
      for(let i = 0; i < item.length; i++){
        let info = item[i].volumeInfo;
        if (info.description && info.imageLinks){
          results.push({
            title : info.title,
            authors : info.authors,
            description : info.description,
            image : info.imageLinks.thumbnail,
            link : info.infoLink
          });
        }
      }
      //res.json(item);
      res.json(results);
    }).catch(err => {
      console.log(err);
      res.status(422).json(err);
    });
  }
});

app.get("/api/books", (req, res)=>{
  db.Book
    .find()
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

app.post("/api/books", (req, res)=>{
  db.Book
    .find(req.body)
    .then(dbModel => {
      //console.log(dbModel);
      if (dbModel.length == 0){
        db.Book
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }
    })
    .catch(err => res.status(422).json(err));
  
});

app.delete("/api/books/:id", (req, res)=>{
  db.Book
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(() => {
      db.Book.find()
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    })
    .catch(err => res.status(422).json(err));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
