const fs = require("fs")
const path = require("path")


class Contact {
    
    static dataFile = path.join(__dirname, "../db/contacts.json");
    
    constructor(obj) {
        this.name = obj.name
        this.email = obj.email
        this.phone = obj.phone
        this.address = obj.address
    }

    toJSON() {
        return {name: this.name, email: this.email, phone: this.phone, address: this.address }
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
}



module.exports = Contact