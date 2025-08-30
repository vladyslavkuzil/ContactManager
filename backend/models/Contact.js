const fs = require("fs")
const path = require("path")


class Contact {
    constructor(obj) {
        this.name = obj[name]
        this.email = obj[email]
        this.phone = obj[phone] 
        this.address = obj[address]
    }

    toJSON() {
        return {name: this.name, email: this.email, phone: this.phone, address: this.address }
    }

    loadContacts(filePath) {
        try {
            if (!fs.existsSync(filePath)) {
                return []
            }
            const contacts = fs.readFileSync(filePath, "utf-8")
            if (!contacts) {
                return []
            }
            return JSON.parse(contacts)
        } catch (err) {
            return []
        }
    }

    saveContacts(contacts, filePath){
        fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2))
    }
}



module.exports = Contact