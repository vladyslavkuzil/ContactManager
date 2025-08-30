const { saveContacts, loadContacts} = require("../db/save_json")

const getContacts = (req, res) => {
    const contacts = loadContacts()
    console.log(contacts)
    res.json(contacts)
}


const addContact = (req, res) => {
    const constactsJson = req.body 
    console.log(constactsJson)
    let contactsArr = loadContacts()
    console.log("1",contactsArr)
    if (!Array.isArray(contactsArr)) {
        contactsArr = []
    }

    contactsArr.push(constactsJson)

    console.log(constactsJson)
    saveContacts(contactsArr) // Save the whole array!
    res.status(201).json({message: "Contact added"})
} 
module.exports = {getContacts,addContact}