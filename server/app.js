const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const loginRouter = require("./routers/login");
const users=require('./routers/users')

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/resumeBuilder")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error :", err));

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.urlencoded({extended:true}))

app.use("/login", loginRouter);
app.use('/users',users)

app.listen(8080,()=>{
    console.log('server is listening');
})
