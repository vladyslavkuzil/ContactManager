const Contact = require("../models/Contact")

const getContacts = (req, res) => {
    const contacts = Contact.loadContacts()
    console.log(contacts)
    res.json(contacts)
}


const addContact = (req, res) => { 

    const newContact = new Contact(Contact.contactsCount()+1, req.body)
    let contactsArr = Contact.loadContacts()
    if (!Array.isArray(contactsArr)) {
        contactsArr = []
    }
    contactsArr.push(newContact.toJSON())
    Contact.saveContacts(contactsArr) // Save the whole array!
    res.status(201).json({message: "Contact added"})
} 


const searchContacts = (req, res) => {
    const query = req.query.criteria || ""
    const newContact = Contact.filterContacts(query)
    res.status(200).json(newContact)
}

const sortContacts = (req, res) => {
    res.status(200).json(Contact.sortContact())
}


const deleteContact = (req, res) => {
    const idx = parseInt(req.params.index, 10);
    let contacts = Contact.loadContacts()
    if (idx >= 0 && idx < contacts.length) {
        contacts.splice(idx, 1)
        Contact.saveContacts(contacts)
        res.json({ msg: "Contact deleted" })
    } else {
        res.status(404).json( { msg: "Contact not found" } )
    }

}
module.exports = {getContacts,addContact, searchContacts, sortContacts, deleteContact}