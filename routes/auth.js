// Importing modules
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const auth = require("../middleware/validateRoute");

// Creating routes

// @mehod       GET
// @desc        Get the user who is logged in
// @access      Private
// @endpoint    /api/auth
router.get("/", auth, async (req, res) => {
  const id = req.user;
  try {
    const user = await User.findById(id).select("-password"); // Exclude the users password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @method      POST
// @desc        Login to the account
// @access      Public
// @endpoint    /api/auth
router.post(
  "/",
  body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
  body("password")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("Password with atleast 8 characters are valid"),
  async (req, res) => {
    // Extracting all the login credentials
    const { email, password } = req.body;

    // Doing some validations
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json(error);

    // If the credentials are valid then we have to check wether these credentials exists or not
    try {
      const user = await User.findOne({
        email,
      });

      if (user) {
        const { _id, email: dbEmail, password: dbPassword } = user;
        const passwordExists = await bcrypt.compare(password, dbPassword);
        if (!dbEmail || !passwordExists)
          return res.status(404).json({ msg: "invalid email or password" });

        // Now we conclude that the user own his/her account in our app
        // We have to give them a unique token so that they can access the private routes of our app
        const token = jwt.sign({ _id }, config.get("secretKey"));
        res.json({ msg: "You are logged in!!", token });
      } else {
        res.status(404).json({ msg: "Invalid email or password" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Exporting module
module.exports = router;
