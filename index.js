require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://vphone-store--vphone-store.europe-west4.hosted.app",
];

// Allow only your frontend domain
const corsOptions = {
  // origin: "https://ly-lash-brow.onrender.com", // Replace with your frontend's URL
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
// app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/v1/all-posts", (req, res) => {
  res.json({ message: "CORS is working!" });
});

const postsRouter = require("./routes/posts.router");
const authRouter = require("./routes/auth.router");

app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is running....");
});
