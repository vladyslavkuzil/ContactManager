const express = require("express");
const app = express()
const router = require("./routes/contacts")
require('dotenv').config();
app.use(express.json())

app.use(express.static("../frontend"))

app.use("/", router)

const PORT = process.env.PORT || 3000


app.listen(PORT, console.log(`Server is listening on port ${PORT}`))