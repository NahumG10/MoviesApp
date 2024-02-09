const dotenv = require("dotenv");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
// console.log("lih", process.env.DATABASE_URL);

const dbConnect = async () => {
    await mongoose.connect(process.env.DATABASE_URL);
};

dbConnect()
    .then(() => {
        console.log("connected to mongoose");
    })
    .catch((e) => {
        console.error(e);
    });

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
