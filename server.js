const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
	.then(() => {
		const server = express()

		server.get('/', (req, res) => {
			const actualPage = '/users'
			return app.render(req, res, actualPage)
		})

		server.get('/users/:id', (req, res) => {
			const actualPage = '/user'
			const queryParams = { id: req.params.id }
			return app.render(req, res, actualPage, queryParams)
		})

		server.get('*', (req, res) => {
			req.url = req.url.replace(/\/$/, '')
			return handle(req, res)
		})

		server.listen(port, (err) => {
			if (err) throw err
			console.log(`> Ready on http://localhost:${port}`)
		})
	})
