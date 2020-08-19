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

// GET

const getUser = async (id) => {
  const user = await User.find({_id:id})
  console.log("getUser: ", user);
  return(user)
}

// CRUD

const createUser = async () => {
  const user = new User({
    email: "1 CREATED USING GET REQUEST",
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
          plantID: "7777777",
          common_name: "3 TEST PLANT NAME",
          notes: "Plant in front yard",
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

async function removeAllFavorites(user) {
const result = await Favorite.deleteMany({ user })
console.log(result)
}









// createUser()
// addFavorite("5f3d87329bd0717c5f42bb8f")
// getFavorites("5f3c79c395044c6ddbc8f96c")
getUser("5f3d87329bd0717c5f42bb8f")
//