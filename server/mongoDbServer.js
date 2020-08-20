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
  favorites: [
    {
      plantID: Number,
      common_name: String,
      notes: String,
      image: String,
      plantUrl: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

// GET

  // DONE
const getUser = async (id) => {
  return await User.find({ _id: id });
};

// CRUD

  // DONE
const createUser = async (email, password) => {
  const user = new User({
    email,
    password,
  });

  return await user.save();
};
  // DONE
async function addFavorite(id, plantObject) {
  // take in plantObject and map it down there
  return await User.findByIdAndUpdate(
    id,
    {
      $push: {
        favorites: plantObject,
      },
    },
    { new: true }
  );
}

// Not working
async function deleteAFavorite(id, plantId) {
  // take in plantObject and map it down there
  return await User.findByIdAndUpdate(
    id,
    {
      $pull: {
        plantId,
      },
    },
    { new: true }
  );
}

deleteAFavorite("5f3d87329bd0717c5f42bb8f", "5f3d876eb353b27ca550531b")

async function deleteFavorite(id, plantID) {
  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        favorites: {
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
  const result = await Favorite.deleteMany({ user });
  console.log(result);
}

// createUser()
// addFavorite("5f3d87329bd0717c5f42bb8f")
// getFavorites("5f3c79c395044c6ddbc8f96c")

// const userID = "5f3dc03a0b1b388bfcf9c17a";
// const plantObject = {
//   plantID: "7777777",
//   common_name: "FAVORITES WORKING",
//   notes: "Plant in front yard",
//   image: "http//fdasffadsfads",
//   plantUrl: "http//fdasffadsfads",
// };

// async function run() {
//   const user = await addFavorite(userID, plantObject);
//   console.log(user);
// }

// run();

// Create 4 new users
// const email1 = "email1";
// const password1 = "password1";
// use this to see what the function returns
// const email2 = "email2"
// const password2 = "password2"
// createUser(email2,password2)
// const email3 = "email3"
// const password3 = "password3"
// createUser(email3,password3)
// const email4 = "email2"
// const password4 = "password2"
// createUser(email4,password4)
