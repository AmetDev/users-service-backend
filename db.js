const { Pool } = require('pg')
const pool = new Pool({
	connectionString:
		'postgres://default:9MYCo2lDcmHh@ep-floral-wind-21019751.us-east-1.postgres.vercel-storage.com:5432/verceldb' +
		'?sslmode=require',
})

pool.connect(err => {
	if (err) throw err
	console.log('Connect to PostgreSQL successfully!')
})

module.exports = pool
