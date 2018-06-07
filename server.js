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
const createKeyPair = require('./utils/createKeyPair')
const MamUtils = require('./utils/mamUtils')
var mam


/*
var accountStore
var contactStore

var asyncInit = () => {
  return new Promise( (res, rej) => {
    accountStore = new AccountStore('account.json', () => {
      contactStore = new ContactStore('contact.json', res)
    })
  })
}
*/

var asyncInit = () => {
    return new Promise( (res, rej) => {
        mam = new MamUtils(res)
    })
}

app.prepare()
    .then(() => asyncInit())
    .then(() => {
        const server = express()

        server.all('/api/proxy/*', (req, res) => {
            proxy.web(req, res, { target: process.env.BACKEND })
        })

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

        /* temporary workaround */
        server.post('/api/createIdentity', async (req, res) => {
            await mam.createIdentity(req.body)
            return res.send('Success')
        })

        server.post('/api/updateLocalAccount', (req, res) => {
            console.log('storageUpdate')
            mam.accountUpdate(req.body)
            return res.send('Success')
        })

        server.post('/api/mamSend', async (req, res) => {
            var packet = req.body.packet
            var params = req.body.params
            console.log(req.body)
            await mam.publishMessage(packet, params)
            return res.send('Success')
        })

        server.post('/api/mamFetch', async (req, res) => {
            var id = req.body.id
            console.log('Fetch mam: ' + id)

            var messages = await mam.fetchMessages(id)
            return res.send(messages)
        })

        /* for filtering propose */
        server.post('/api/addContact', async (req, res) => {
            mam.addContact(req.body.self_id, req.body.new_id)
        })

        server.get('/api/fetchUserList', (req, res) => {
            console.log('fetching user')
            const list = mam.accountStore.findAll()
            return res.send(list)
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
