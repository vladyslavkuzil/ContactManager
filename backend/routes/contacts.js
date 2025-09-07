const express = require("express")
const router = express.Router()

const { getContacts, addContact, searchContacts, sortContacts, deleteContact, updateContact, getContact } = require("../controllers/contacts")

router.route("/").post(addContact)
router.route("/contacts").get(getContacts)
router.route("/contacts/search").get(searchContacts)
router.route("/contacts/sort").get(sortContacts)
router.route("/contacts/:index").delete(deleteContact).patch(updateContact)
router.route("/contacts/update").patch(updateContact).get(getContact)


module.exports = router
