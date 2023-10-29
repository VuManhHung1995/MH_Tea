const express = require("express");
const userRoute = require("./src/routes/user.route");
const bodyParser = require("body-parser");
const productRoute = require("./src/routes/product.route");
const categoryRoute = require("./src/routes/category.route");
const cartRoute = require("./src/routes/cart.route");
const orderRoute = require("./src/routes/order.route");

const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const emailRoute = require("./src/routes/email.route");
const commentRoute = require("./src/routes/comment.route");
const port = 8080;

dotenv.config();

app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/email", emailRoute);
app.use("/api/v1/comments", commentRoute);

app.listen(port, () => console.log(`Ban dang lang nghe port ${port}`));
