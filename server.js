const express = require('express')
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer()
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const createKeyPair = require('./utils/createKeyPair')

app.prepare()
	.then(() => {
		const server = express()

		server.get('/', (req, res) => {
			const actualPage = '/users'
			return app.render(req, res, actualPage)
		})

		server.get('/api/keyPairs', (req, res) => {
			return res.send(createKeyPair())
		})

		server.all('/api/proxy/*', (req, res) => {
			proxy.web(req, res, { target: process.env.BACK_END_API })
		})

		server.get('/users/new', (req, res) => {
			const actualPage = '/users/new'
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
