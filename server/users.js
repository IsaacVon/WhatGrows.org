const express = require("express");
const app = express();

const user = [
  {
    _id: `5f3c79c395044c6ddbc8f96c`,
    email: "isaac_householder",
    password: "102823",
    favorites: [
      {
        _id: `5f3d874f6c0ffd7c7e5ed461`,
        plantID: `1356321`,
        common_name: "mango",
        notes: "plant in back yard",
        image: "http//fdasffadsfads",
        plantUrl: "http//fdasffadsfads",
      },
      {
        _id: `5f3d876eb353b27ca550531b`,
        plantID: `7777777`,
        common_name: "papaya",
        notes: "plant in yard",
        image: "http//fdasffadsfads",
        plantUrl: "http//fdasffadsfads",
      },
    ],
  },
];

// getUser
app.get("/api/:id", (req, res) => {
  // Input: id
  id = req.params.id

  // put id into function

  // res.send output of function
  res.send( id )

  // const user = 
  
});

// createUser
  // Input: name, email, password

// addFavorite
  // Input: id, plantObject

// deleteFavorite
  // Input: id, plantMongoId

// deleteAllFavorites
  // Input: id
  
// Edit Favorite

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
