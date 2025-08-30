const fs = require("fs")
const path = require("path")


const dataFile = path.join(__dirname, "contacts.json")

const loadContacts = () => {
    try {
        if (!fs.existsSync(dataFile)) {
            return []
        }
        const contacts = fs.readFileSync(dataFile, "utf-8")
        if (!contacts) {
            return []
        }
        return JSON.parse(contacts)
    } catch (err) {
        return []
    }
}

const saveContacts = (contacts) => {
    fs.writeFileSync(dataFile, JSON.stringify(contacts, null, 2))
}

module.exports = {saveContacts, loadContacts}