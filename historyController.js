const { pool } = require('./db')

class HistoryController {
	async createHistory(req, res) {
		console.log('1')
		const { nickname } = req.body
	  
		try {
		  let idUser = await pool.query('select id from users where nickname = $1', [nickname])
	  
		  console.log('2')
	  
		  const resi = await pool.query(
			'INSERT INTO history_users (user_id, type_activity, date_activity, nickname) VALUES($1, $2, $3, $4)',
			[idUser.rows[0].id, 'registration', '22-10-2023', nickname]
		  )
	  
		  console.log(resi)
	  
		  res.send({ message: 'historyusers' })
		} catch (e) {
		  res.status(500).send(e)
		}
	  }
	async getOneHistory(req, res) {
		const { nickname, id } = req.body
		try {
			const result = await pool.query(
				'SELECT * FROM history_users WHERE nickname = $1',
				[nickname]
			)
			res.send(result)
		} catch (e) {
			res.send(e)
		}
	}
	async getAllHistory(req, res) {
		try {
			const result = await pool.query('SELECT * FROM history_users')
			res.send(result)
		} catch (error) {
			res.send(error)
		}
	}
}

module.exports = new HistoryController()
