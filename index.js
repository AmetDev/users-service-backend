const express = require('express')
const {pool } = require("./db.js")
const userRouter = require('./userRouter.js')
const PORT = 4000;
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json())
app.use("/auth", userRouter)
const start = async () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error) {
        res.json({"error": error})
    }
}
app.get('/accessresource', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if(!token) {
    res.status(200).json({success:false, message:"Error! Token was not provided"});
  }
  const decodedToken = jwt.verify(token, "AWS245V");
  res.status(200).json({success:true, data:{userId:decodedToken.nickname, date_of_birth:decodedToken.date_of_birth}});
})
start()
