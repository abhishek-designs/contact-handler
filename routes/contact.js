// Importing modules
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/validateRoute");
const Contact = require("../model/Contact");

// Creating routes (CRUD)

// @method      GET
// @desc        To fetch all the user's saved contacts
// @access      Private
// @endpoint    /api/contact
router.get("/", auth, async (req, res) => {
  // Extracting user's id
  const _id = req.user;

  // Carry out the user's saved contacts
  try {
    const contacts = await Contact.find({ user: _id });
    if (contacts.length === 0) return res.send("");

    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @method      POST
// @desc        To add a contact
// @access      Private
// @endpoint    /api/contact
router.post(
  "/",
  auth,
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name should not be empty")
    .isLength({ min: 4 })
    .withMessage("Name should contain atleast 4 characters"),
  body("email").isEmail().withMessage("Invalid email"),
  body("phone")
    .matches(/\+?([0-9]{2})?[]?\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}/)
    .withMessage("Should be a valid phone number"),
  async (req, res) => {
    // Extracting user's id
    const _id = req.user;

    // First extracting all the user's contact details through request body
    const { name, email, phone, type } = req.body;

    // Now doing some validations
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json(error);

    // Check if thats the unique phone number
    try {
      const isPhoneExists = await Contact.findOne({ phone });
      const isEmailExists = await Contact.findOne({ email });
      if (isPhoneExists || isEmailExists)
        return res.status(400).json({ msg: "Contact already exists" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    // Storing contact into the database
    try {
      const contact = new Contact({
        name,
        email,
        phone,
        type,
        user: _id,
      });

      // Save the contact to the database
      await contact.save();
      res.status(201).json({ msg: "Contact saved" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @method      PUT
// @desc        To update an existing contact
// @access      Private
// @endpoint    /api/contact/:contactid
router.put(
  "/:contactid",
  auth,
  body("email").isEmail().withMessage("Invalid email"),
  body("phone")
    .optional()
    .matches(/\+?([0-9]{2})?[]?\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}/)
    .withMessage("Should be a valid phone number"),
  async (req, res) => {
    // Extracting user's id
    const _id = req.user;

    // Validating contact details
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json(error);

    // If all the details are valid then we have to specify the user should be the account holder not a stranger
    try {
      const { user } = await Contact.findById(req.params.contactid);
      if (_id !== user.toString())
        // The user id in the database is the object so we have to convert into the string
        return res.status(401).json({ msg: "You are not a valid user" });

      // If the user is valid then He/She can freely update the contacts
      const updatedContact = await Contact.findOneAndUpdate(
        { _id: req.params.contactid },
        req.body,
        { new: true } // Show the updated contact
      );
      res.json({ msg: "contact updated", updatedContact });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @method      DELETE
// @desc        To delete a contact
// @access      Private
// @endpoint    /api/contact/:contactid
router.delete("/:contactid", auth, async (req, res) => {
  // Extracting user's id
  const _id = req.user;

  // Restrict the stranger to access and delete other user's contact
  try {
    const { user } = await Contact.findById(req.params.contactid);
    if (_id !== user.toString())
      return res.status(401).json({ msg: "You are not a valid user" });

    // Proceed the deletion process
    await Contact.findOneAndDelete({ _id: req.params.contactid });
    res.json({ msg: "contact deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Exporting module
module.exports = router;
