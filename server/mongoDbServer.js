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

  // DONE
async function deleteAFavorite(id, plantMongoId) {
  // take in plantObject and map it down there
  const user =  await User.findOneAndUpdate(
    { _id: id },
    { $pull: { favorites: { _id: plantMongoId } } },
    { new: true }
  )
}



async function deleteAllFavorites(user) {
  const result = await Favorite.deleteMany({ user });
  console.log(result);
}

// createUser()
// addFavorite("5f3d87329bd0717c5f42bb8f")
// getFavorites("5f3c79c395044c6ddbc8f96c")

// const userID = "5f3dbfd0737f428b535b68f9";
// const plantObject = {
//   plantId: "1111111",
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
  // createUser(email1,password1)

  // const email2 = "email2"
  // const password2 = "password2"
  // createUser(email2,password2)

  // const email3 = "email3"
  // const password3 = "password3"
  // createUser(email3,password3)

  // const email4 = "email4"
  // const password4 = "password4"
  // createUser(email4,password4)
