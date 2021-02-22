// Importing modules
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
const User = require("../model/User");

// Creating routes

// @method      POST
// @desc        To register a user for the app
// @access      Public
// @endpoint    /api/user
router.post(
  "/",
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name should not be empty")
    .isLength({ min: 4 })
    .withMessage("Name must be atleast 4 characters long"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long")
    .matches(/^(?=.*[0-9])(?=.*[!@#$%*&])[a-zA-Z0-9!@#$%*&]{8,}$/i)
    .withMessage(
      "Password must contains atleast one special character and number"
    ),
  async (req, res) => {
    // Extracting details from the user
    const { name, email, password } = req.body;

    // Doing some validation before storing the user
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json(error);

    // If the details are valid then we have to check wether that's exists or not
    try {
      const emailExists = await User.findOne({ email });
      const pwdExists = await User.findOne({ password });
      if (emailExists || pwdExists)
        return res.status(400).json({ msg: "You are already registered" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    // Storing details into the database
    try {
      // If all the things are valid then we have to hash the password for security
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      // Store the details
      await user.save();
      // Fetch the user id from the database
      const { _id } = await User.findOne({ email });
      // Signing token
      const token = jwt.sign({ _id }, config.get("secretKey"));
      // Send the response with token
      res.status(201).json({ msg: "user created!!", token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Exporting module
module.exports = router;
