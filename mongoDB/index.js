const mongoose = require("mongoose");

mongoose
  .set("useUnifiedTopology", true)
  .connect("mongodb://localhost/UrbanHomesteading", {
    useNewUrlParser: true,
    useFindAndModify: false,
  })

  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const favoriteSchema = new mongoose.Schema({
  user: String,
  plandID: Number,
  common_name: String,
  notes: String,
  image: String,
  plantUrl: String,
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

async function createFavorite() {
  const favorite = new Favorite({
    user: "isaac_householder",
    plandID: 102823,
    notes: "Might grow indoors, research more.",
    common_name: "American century plant",
    image:
      "https://bs.floristic.org/image/o/8579702f29c9ee06b7284106c9b74d2db0bd2b75",
    plantUrl: "/api/v1/plants/agave-americana",
  });

  const result = await favorite.save();
  console.log(result);
}

async function getFavorites(user) {
  const favorites = await Favorite.find({user}).limit(20).sort({ name: -1 });
  console.log(favorites);
}

// Updates and returns updated document
async function updateFavorite(id) {
  const favorite = await Favorite.findByIdAndUpdate(
    id,
    {
      $set: {
        notes:
          "dingus live again all mongodb errors gone, Might grow indoors, research more.",
      },
    },
    { new: true }
  );
  console.log(favorite);
}

async function removeFavorite(id) {
const result = await Favorite.deleteOne({ _id: id })
console.log(result)
}

async function removeAllFavorites(user) {
const result = await Favorite.deleteMany({ user })
console.log(result)
}

