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
  name: String,
  email: String,
  password: String,
  favorites: [
    {
      plantId: Number,
      common_name: String,
      notes: String,
      image: String,
      plantUrl: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

// GET
const getUser = async (id) => {
  const user = await User.find({ _id: id });
  console.log("getUser:", user);
  return user;
};

// CRUD
const createUser = async (name, email, password) => {
  const user = new User({
    name,
    email,
    password,
  });
  const newUser = await user.save();
  console.log("newUser:", newUser);
  return newUser;
};

createUser("isaac Householder", "isaachouseholder@gmail.com", "password12")
const addFavorite = async (id, plantObject) => {
  // take in plantObject and map it down there
  const user = await User.findByIdAndUpdate(
    id,
    {
      $push: {
        favorites: plantObject,
      },
    },
    { new: true }
  );

  console.log("addFavorites, all favorites:", user);
  return user;
};
const deleteAFavorite = async (id, plantMongoId) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $pull: { favorites: { _id: plantMongoId } } },
    { new: true }
  );
  console.log("deleteAFavorite, user:", user);
  return user;
};
const deleteAllFavorites = async (id) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $set: { favorites: [] } },
    { new: true }
  );
  console.log("deleteAllFavorites, user:", user);

  return user;
};

// export {
//   getUser,
//   createUser,
//   addFavorite,
//   deleteAFavorite,
//   deleteAllFavorites,
// };

// Add favorite to a user
// const userID = "5f3edddf57054fa48f0dd4fd";
// const plantObject = {
//   plantId: "9999999",
//   common_name: "FAVORITES WORKING",
//   notes: "Plant in front yard",
//   image: "http//fdasffadsfads",
//   plantUrl: "http//fdasffadsfads",
// };
// addFavorite(userID, plantObject);

// Create 4 new users
// const email2 = "email2"
// const password2 = "password2"
// createUser(email2,password2)

// const email3 = "email3"
// const password3 = "password3"
// createUser(email3,password3)

// const email4 = "email4"
// const password4 = "password4"
// createUser(email4,password4)
