require("dotenv").config();
const passport = require("passport");
const expressSession = require("express-session");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const calendar = require("./routes/Calendar");
const post = require("./routes/post");
const token = require("./routes/tokens");
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const cookieParser = require("cookie-parser");
const path = require("path");
const secretKey = process.env.JWT_SECRET_KEY;
const User = require("./models/User");
const app = express();
const port = 9000;

connectDB();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use((req, res, next) => {
  res.set("Cache-Control", "no-cache, max-age=0");
  next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
/*&app.use(passport.initialize());
require("./config/passport.js");
*/
app.use(
  expressSession({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  }),
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, "build")));

app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/calendar", calendar);
app.use("/post", post);
app.use("/tokens", token);
//app.use('/dashboard', dashboard);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
