// Importing modules
const mongoose = require("mongoose");
const config = require("config");

// Connect to mongoDB database
module.exports = () => {
  mongoose.connect(
    "mongodb+srv://abhishek:Abhi9584@todo.r8sg1ne.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => console.log("DB Connected!!")
  );
};
