// Importing modules
const express = require("express");
const DBConnect = require("./config/connectDB");

// Initializing app
const app = express();
DBConnect(); // Establish connection to the database

// Middlewares
app.use(express.json({ extended: true }));
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contact", require("./routes/contact"));

// listening on the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
