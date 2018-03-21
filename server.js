const express = require('express')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer()
const next = require('next')
const bodyParser = require('body-parser') /* use for server.post */

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const transformToQRCode = require('./utils/transformToQRCode')
const AccountStore = require('./utils/account')
const createKeyPair = require('./utils/createKeyPair')

var accountStore

/* make the callback function into promise */
var asyncInit = () => {
	return new Promise( (res, rej) => {
		accountStore = new AccountStore('account.json', res)
	})
}

app.prepare()
	.then(() => asyncInit())
	.then(() => {
		const server = express()
		server.use(bodyParser.urlencoded({ extended: false }))
		server.use(bodyParser.json())

		server.get('/', (req, res) => {
			const actualPage = '/users'
			return app.render(req, res, actualPage)
		})

		server.get('/api/keyPairs', async (req, res) => {
			const { sk, pk } = createKeyPair()
			const [ skImg, pkImg ] = await Promise.all([sk, pk].map(transformToQRCode))
			return res.send({ sk, skImg, pk, pkImg})
		})
		server.post('/api/localStorageUpdate', (req, res) => {
			console.log('storageUpdate')
			accountStore.insert(req.body)
			return res.send('Success')
		})

		server.get('/api/fetchUserList', (req, res) => {
			console.log('fetching user')
			const list = accountStore.all().map(user => user.data)
			return res.send(list)
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

		server.get('/claims/info/:hash_txn', (req, res) => {
			const actualPage = '/claims/info'
			const queryParams = { hash_txn: req.params.hash_txn }
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
