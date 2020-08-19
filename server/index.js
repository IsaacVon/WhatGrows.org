const mongoose = require("mongoose");

mongoose
  .set("useUnifiedTopology", true)
  .connect("mongodb://localhost/UrbanHomesteading", {
    useNewUrlParser: true,
    useFindAndModify: false,
  })

  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  favorites: [{ 
    plantID: Number,
    common_name: String,
    notes: String,
    image: String,
    plantUrl: String,
  }]
});

const User = mongoose.model("User", userSchema);

async function createUser() {
  const user = new User({
    email: "isaac_householder",
    password: "102823",
  });

  const result = await user.save();
  console.log(user);
}

async function addFavorite(id, plantObject) {
  // take in plantObject and map it down there
  const user = await User.findByIdAndUpdate(
    id,
    {
      $push: {
        favorites:
        { 
          plantID: "1356321",
          common_name: "2 TEST PLANT NAME",
          notes: "Plant in back yard",
          image: "http//fdasffadsfads",
          plantUrl: "http//fdasffadsfads",
        },
      },
    },
    { new: true }
  );
  console.log(user);
}

// Not working
async function deleteFavorite(id, plantID) {

  
  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        favorites:
        { 
          plantID: "1356321",
          common_name: "2 TEST PLANT NAME",
          notes: "Plant in back yard",
          image: "http//fdasffadsfads",
          plantUrl: "http//fdasffadsfads",
        },
      },
    },
    { new: true }
  );
  console.log(user);
}


async function getFavorites(user) {
  const favorites = await User.find({user}).limit(20)
  // .sort({ name: -1 });
  console.log(favorites);
}

async function removeFavorite(id) {
const result = await Favorite.deleteOne({ _id: id })
console.log(result)
}

async function removeAllFavorites(user) {
const result = await Favorite.deleteMany({ user })
console.log(result)
}


// createUser()
// addFavorite("5f3c79c395044c6ddbc8f96c")
getFavorites("5f3c79c395044c6ddbc8f96c")