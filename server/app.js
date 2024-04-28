const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken"); 
const loginRouter = require("./routers/login");
const users = require('./routers/users');
const batch = require("./routers/batches");

const app = express();

function customMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({
        status: 401,
        message: "No token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, 'gradious-cohort');
    req.user = decoded;
    next();
  } catch (err) {
      return res.status(403).send({
          status: 403,
          message: "Invalid token",
      });
  }
}
mongoose
  .connect("mongodb://127.0.0.1:27017/resumeBuilder")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error :", err));

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.urlencoded({extended:true}));

app.use("/login", loginRouter);
app.use('/users',customMiddleware,users);
app.use("/batches",batch);

app.listen(8080,()=>{
    console.log('server is listening');
})
