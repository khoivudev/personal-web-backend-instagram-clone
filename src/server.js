require("dotenv/config");
require("./config/db");
const express = require("express");
const app = express();
const cors = require("cors");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
