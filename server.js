const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const transformToQRCode = require('./utils/transformToQRCode');
const createKeyPair = require('./utils/createKeyPair');
const MamUtils = require('./utils/mamUtils');

let mam;


const asyncInit = () => new Promise((res, rej) => { // eslint-disable-line no-unused-vars
  mam = new MamUtils(res);
});

app.prepare()
  .then(() => asyncInit())
  .then(() => {
    const server = express();

    server.use(express.json());

    server.get('/', (req, res) => {
      const actualPage = '/users';
      return app.render(req, res, actualPage);
    });

    server.get('/api/keyPairs', async (req, res) => {
      const { sk, pk } = createKeyPair();
      const [skImg, pkImg] = await Promise.all([sk, pk].map(transformToQRCode));
      return res.send({
        sk, skImg, pk, pkImg,
      });
    });

    server.post('/api/updateLocalAccount', (req, res) => {
      console.log('storageUpdate');
      mam.accountUpdate(req.body);
      return res.send('Success');
    });

    server.post('/api/mamSend', async (req, res) => {
      const { packet, params } = req.body;
      console.log(req.body);
      await mam.publishMessage(packet, params);
      return res.send('Success');
    });

    server.post('/api/mamFetch', async (req, res) => {
      const { id } = req.body;
      console.log(`Fetching mam: ${id}`);

      const messages = await mam.fetchMessages(id);
      return res.send(messages);
    });

    /* for filtering propose */
    server.post('/api/addContact', async (req, res) => {
      mam.addContact(req.body.self_id, req.body.new_id);
      return res.send('Success');
    });

    server.get('/api/user/:id', (req, res) => {
      const user = mam.accountStore.findOnly({ id: req.params.id });
      return res.send(user);
    });

    server.get('/api/fetchUserList', (req, res) => {
      console.log('fetching user');
      const list = mam.accountStore.findAll();
      return res.send(list);
    });

    server.get('/users/new', (req, res) => {
      const actualPage = '/users/new';
      return app.render(req, res, actualPage);
    });


    server.get('/users/:id', (req, res) => {
      const actualPage = '/user';
      const queryParams = { id: req.params.id };
      return app.render(req, res, actualPage, queryParams);
    });

    server.get('/claims/info/:transactionHash', (req, res) => {
      const actualPage = '/claims/info';
      const queryParams = { transactionHash: req.params.transactionHash };
      return app.render(req, res, actualPage, queryParams);
    });


    server.get('*', (req, res) => {
      req.url = req.url.replace(/\/$/, '');
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
