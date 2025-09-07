const fs = require("fs")
const path = require("path")


class Contact {
    
    static dataFile = path.join(__dirname, "../db/contacts.json");
    
    constructor(id, obj) {
        this.id = id
        this.name = obj.name
        this.email = obj.email
        this.phone = obj.phone
        this.address = obj.address
    }

    toJSON() {
        return {id: this.id, name: this.name, email: this.email, phone: this.phone, address: this.address }
    }

    static findContact(id) {
        const contacts = Contact.loadContacts()
        
        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i]["id"] == id) {
                return contacts[i]
            }
        }
        return null}

    static contactsCount() {
        return Contact.loadContacts().length
    }

    static loadContacts() {
        try {
            if (!fs.existsSync(Contact.dataFile)) {
                return []
            }
            const contacts = fs.readFileSync(Contact.dataFile, "utf-8")
            if (!contacts) {
                return []
            }
            return JSON.parse(contacts)
        } catch (err) {
            return []
        }
    }

    static saveContacts(contacts){
        fs.writeFileSync(Contact.dataFile, JSON.stringify(contacts, null, 2))
    }

    static filterContacts(query) {
        let contacts = Contact.loadContacts()
        let matches = contacts.filter((contact) => {
            return (
                contact.name.toLowerCase().includes(query.toLowerCase()) ||
                contact.phone.includes(query) ||
                contact.email.toLowerCase().includes(query.toLowerCase())    
            )
        })
        return matches
    }

    static sortContact() {
        return Contact.loadContacts().sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    }
    static getID() {
        const contacts = Contact.loadContacts()
        if (contacts.length >= 1) {
            return contacts[contacts.length-1]["id"]+1
        } else {
            return 1
        }
    }
}



module.exports = Contact