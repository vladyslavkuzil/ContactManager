const express = require("express")
const router = express.Router()

const { getContacts, addContact } = require("../controllers/contacts")

router.route("/").post(addContact)
router.route("/contacts").get(getContacts)

module.exports = router