app.get('/accessResource', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if(!token) {
    res.status(200).json({success:false, message:"Error! Token was not provided"});
  }
  const decodedToken = jwt.verify(token, "AWS245V");
  res.status(200).json({success:true, data:{userId:decodedToken.nickname, date_of_birth:decodedToken.date_of_birth}});
})
