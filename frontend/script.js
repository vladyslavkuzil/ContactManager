const createForm = document.getElementById("contact-form")
const contactsList = document.getElementById("contact-list")
const emptyMsg = document.getElementById("empty-msg")


const checkData = (contact) => {
    const nameRegex = /^[A-Za-z]{1,16}$/ 
    const emailRegex = /^\w+@[A-Za-z]{3,}\.[A-Za-z]{2,}$/
    const phoneRegex = /^\d{9}$/
    const addressRegex = /^\w+$/
    for (const key in contact) {
        switch (key) {
            case "name":
                if (!nameRegex.test(contact[key])) {
                    alert("Name is uncorrect")
                    return false
                }
                break;
            case "email":
                if (!emailRegex.test(contact[key])) {
                    alert("email is uncorrect")
                    return false
                }
                break;
            case "phone":
                if (!phoneRegex.test(contact[key])) {
                    alert("phone is uncorrect")
                    return false
                }
                break;
            case "address":
                if (!addressRegex.test(contact[key])) {
                    alert("address is uncorrect")
                    return false;
                }
                break;
            default:
                break;
        }
    } 
    return true
}
    

const loadContacts = async () => {
    const response = await fetch("/contacts")
    const contacts = await response.json()  
    contactsList.innerHTML = ""
    if (contacts) {
        emptyMsg.textContent = ""
    }
    
    contacts.forEach(element => {
        const li = document.createElement("li")
        li.className = "contact-item";
        li.innerHTML = `
            <div class="contact-info">
                <div class="avatar">${element.name ? element.name[0].toUpperCase() : "?"}</div>
                    <div class="meta">
                        <div class="name">${element.name}</div>
                        <div class="sub">${element.email} &bull; ${element.phone} &bull; ${element.address}</div>
                    </div>
                </div>
            `;
        contactsList.appendChild(li)
    }); 
}

window.onload = loadContacts

const createContact = async (newContact) => {
    try {
        const response = await fetch("/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json", 
            },
            body: JSON.stringify(newContact)
        })
        if (!response.ok) {
            throw new Error(`Status code ${response.status}`)
        }

        const result = await response.json()
        console.log("Contact added", result)
        loadContacts()
    } catch (error) {
        
    }
} 

createForm.addEventListener("submit", (event) => {
    event.preventDefault()    
    
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const phone = document.getElementById("phone").value.trim()
    const address = document.getElementById("address").value.trim()

    const newContact = { name, email, phone, address }
   
    let isDataCorrect = false
   
    isDataCorrect = checkData(newContact)
    
    if (isDataCorrect) {
        createContact(newContact)
        createForm.reset()
    }
    
});