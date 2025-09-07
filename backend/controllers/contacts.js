const Contact = require("../models/Contact")

const getContacts = (req, res) => {
    const contacts = Contact.loadContacts()
    res.json(contacts)
}


const addContact = (req, res) => { 

    const newContact = new Contact(Contact.getID(), req.body)
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
    const id = parseInt(req.params.index, 10);
    let contacts = Contact.loadContacts()
    let index;
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i]["id"] === id) {
            index = i
            break;
        }
    }
    if (index >= 0 && index < contacts.length) {
        contacts.splice(index, 1)
        Contact.saveContacts(contacts)
        res.json({ msg: "Contact deleted" })
    } else {
        res.status(404).json( { msg: "Contact not found" } )
    }

}

const updateContact = (req, res) => {
    
    try {
        const contacts = Contact.loadContacts()
        const id = parseInt(req.query.id, 10)
        const updatedData = req.body
        const idx = contacts.findIndex(c => c.id === id);
        if (idx === -1) {
            return res.status(404).json({ msg: "Contact not found" });
        };

        for (const key in updatedData) {
            if (contacts[idx].hasOwnProperty(key)) {
                contacts[idx][key] = updatedData[key]
            }
        }
    
        Contact.saveContacts(contacts)
        res.status(200).json({msg: "Patch request succesful"})
    } catch (error) {
        res.status(400).json({msg: "Error occured"})
    }
} 

const getContact = (req, res) => {
    const id = req.query.id
    const contact = Contact.findContact(id)
    if (contact) {
        res.status(200).json(contact)
    } else {
        res.status(404).json({msg: "Cannot find a contact"})
    }
}
module.exports = {getContacts,addContact, searchContacts, sortContacts, deleteContact, updateContact, getContact}