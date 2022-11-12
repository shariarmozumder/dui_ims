const express=require('express');
const app = express();
const helmet = require('helmet');
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const cors = require('cors');
const colors = require("colors")
const { readdirSync } = require("fs");

// middlewares
app.use(helmet())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

// DB Connection
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("DB connected successfully".blue.bold))
    .catch((err) => console.log("DB Error => ", err));

// routes middleware
readdirSync("./routes").map(d => app.use("/api/v1", require(`./routes/${d}`)));

// server
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App is  running on port ${port}`.red.bold);
});