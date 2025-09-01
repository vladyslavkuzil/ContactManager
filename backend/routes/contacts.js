const express = require("express")
const router = express.Router()

const { getContacts, addContact, searchContacts, sortContacts } = require("../controllers/contacts")

router.route("/").post(addContact)
router.route("/contacts").get(getContacts)
router.route("/contacts/search").get(searchContacts)
router.route("/contacts/sort").get(sortContacts)



module.exports = router
