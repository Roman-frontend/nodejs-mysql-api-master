const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

// Allow only your frontend domain
const corsOptions = {
  origin: "https://ly-lash-brow.onrender.com", // Replace with your frontend's URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/v1/all-posts", (req, res) => {
  res.json({ message: "CORS is working!" });
});

const postsRouter = require("./routes/posts.router");
const authRouter = require("./routes/auth.router");

app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running....");
});
