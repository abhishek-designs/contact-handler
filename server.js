// Importing modules
const express = require("express");
const path = require("path");
const DBConnect = require("./config/connectDB");

// Initializing app
const app = express();
DBConnect(); // Establish connection to the database

// Middlewares
app.use(express.json({ extended: true }));
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contact", require("./routes/contact"));

// Loading the static build of our app when our app is in production state
// if (process.env.NODE_ENV === "production") {
// If it is in production, load the static file
// app.use(express.static("client/build"));
app.use(express.static("client/build"));
// app.use(express.static("client"));

// TODO ADmin  side
// app.get("/admin", (req, res) => {
//   // Send the index.html file
//   res.sendFile(path.resolve(__dirname, "admin", "index.html"));
// });
// Also load the index.html file of the final build when a user hits any get method except the above ones
// TODO MAIN SITE
app.get("/", (req, res) => {
  // Send the index.html file
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// TODO Test side
// app.get("/test", (req, res) => {
//   // Send the index.html file
//   res.sendFile(path.resolve(__dirname, "testf", "index.html"));
// });

// }

// listening on the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
