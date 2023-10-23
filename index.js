const express = require('express')
const { pool } = require('./db.js')
const userRouter = require('./userRouter.js')
const PORT = 4000
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())
app.use('/auth', userRouter)
const start = async () => {
	try {
		app.listen(PORT, () => console.log(`server started on port ${PORT}`))
	} catch (error) {
		res.json({ error: error })
	}
}

start()
