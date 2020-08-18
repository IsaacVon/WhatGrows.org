const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/UrbanHomesteading")
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const favoriteSchema = new mongoose.Schema({
  image: String,
  common_name: String,
  plantUrl: String,
  plandID: Number,
  Notes: String,
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

async function createFavorite() {
  const favorite = new Favorite({
    image:
    "https://bs.floristic.org/image/o/8579702f29c9ee06b7284106c9b74d2db0bd2b75",
    common_name: "American century plant",
    plantUrl: "/api/v1/plants/agave-americana",
    plandID: 102823,
    Notes: "Might grow indoors, research more."
  });

  const result = await favorite.save();
  console.log(result);
}

async function getFavorites() {
  const favorites = await Favorite.find({ });
  console.log(favorites)
}


getFavorites();
