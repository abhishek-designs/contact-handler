// Importing modules
const mongoose = require("mongoose");
const config = require("config");

// Connect to mongoDB database
module.exports = () => {
  mongoose.connect(
    config.get("connectString"),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => console.log("DB Connected!!")
  );
};
