require("dotenv").config();
const express = require("express");
const app = express();
const Blog = require("./models/blog.model.js");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication.js");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;
const { connectMongodb } = require("./connection.js");
const path = require("path");
const userRoute = require("./routes/user.route.js");
const blogRoute = require("./routes/blog.route.js");

connectMongodb(process.env.MONGODB_URL).then(() =>
  console.log("mongodb connected")
);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.use(checkForAuthenticationCookie("token"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  return res.render("home", { user: req.user, blogs: allBlogs });
});
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
