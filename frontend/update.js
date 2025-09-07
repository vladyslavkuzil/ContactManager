const form = document.getElementById("update-form")
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const phoneInput = document.getElementById("phone")
const addressInput  = document.getElementById("address")



const fetchData = async () => {
    try {
        const response = await fetch(`/contacts/update?id=${getID()}`)
        const data = await response.json()
        nameInput.value = data.name
        emailInput.value = data.email
        phoneInput.value = data.phone
        addressInput.value = data.address
        
    } catch (error) {
        console.log(error)
    }
}


window.addEventListener("load", () => {
    fetchData()
})  
    
    

const getID = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get("id")
} 

const checkData = (name, email, phone, address) => {
    const nameRegex = /^[A-Za-z]{1,16}$/ 
    const emailRegex = /^\w+@[A-Za-z]{3,}\.[A-Za-z]{2,}$/
    const phoneRegex = /^\d{9}$/
    const addressRegex = /^\w+$/
    let obj = {}
    if (nameRegex.test(name)) {
        obj["name"] = name
    } 

    if (emailRegex.test(email)) {
        obj["email"] = email
    }

    if (phoneRegex.test(phone)) {
        obj["phone"] = phone
    }

    if (addressRegex.test(address)) {
        obj["address"] = address 
    }

    return obj
}

form.addEventListener("submit", async (e) => {
    e.preventDefault() 
    const id = getID()
    if (!id) {
        alert("No contact ID provided")
        return
    }

    const obj = checkData(nameInput.value, emailInput.value, phoneInput.value, addressInput.value)
    if (Object.entries(obj).length < 1) {
        alert("No valid data to update")
    } else {
        try {
            const response = await fetch(`/contacts/update?id=${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            if (response.ok) {
                nameInput.value = ""
                emailInput.value = ""
                phoneInput.value = ""
                addressInput.value = ""
                const notification = document.getElementById("notification")
                notification.textContent = "Contact has been updated succesfully!"
                notification.classList.add("show")

                setTimeout(() => {
                    notification.classList.remove("show")
                    window.location.href ="index.html"
                }, 2000)
            }
        } catch (error) {
            console.error("Error updating contact:", error)
        }
    }
})