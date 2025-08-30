const fs = require("fs")
const path = require("path")


const dataFile = path.join(__dirname, "contacts.json")

console.log(dataFile)

const loadContacts = (filePath) => {
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

const saveContacts = (contacts, filePath) => {
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2))
}

module.exports = {saveContacts, loadContacts}