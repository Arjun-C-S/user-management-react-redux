const express = require("express");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const {v4:uuidv4} = require('uuid')
const cors = require('cors');


const loginRoutes = require("./routes/loginRoutes");
const signUpRoutes = require("./routes/signUpRoutes");
const homeRoutes = require("./routes/homeRoutes");
const profileRoutes = require('./routes/profileRoutes')

const adminLoginRoutes = require("./routes/adminLoginRoutes");
const adminHomeRoutes = require("./routes/adminHomeRoutes");
const adminCustomerRoutes = require("./routes/adminCustomerRoutes");
const adminSearchRoutes = require("./routes/adminSearchRoutes");

const errorController = require("./controller/404");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

const connectDB = require("./database/connection");

const adminDataBase = require("./models/adminModel");

// mongodb connection
connectDB();

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});

app.use(session({
  secret : uuidv4(),
  resave:false,
  saveUninitialized:true,
  cookie: { maxAge: 6000000000 },
}))

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use("/customer", signUpRoutes);
app.use("/customer", homeRoutes);
app.use("/customer", profileRoutes);
app.use("/customer", loginRoutes);

app.use("/admin", adminLoginRoutes);
app.use("/admin", adminHomeRoutes);
app.use("/admin", adminCustomerRoutes);
app.use("/admin", adminSearchRoutes);


app.use(errorController.get404);
app.use(adminDataBase); //create admin collection (only one time)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
