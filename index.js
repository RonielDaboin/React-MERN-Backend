const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config();

console.log(process.env.PORT);

// Create an Express application
const app = express();

// Database connection
dbConnection();

// Middleware CORS
app.use(cors()); 

//Directory Public

app.use(express.static("public"));

//lecture and parse the body of the request //lectura y parseo del body de la petición
app.use(express.json());

//routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
//TODO: auth/ create, login, renew
//TODO: events/ create, update, delete, list ( CRUD )



//listen petitions on port 3000
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});




