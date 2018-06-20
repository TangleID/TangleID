const QRCode = require('qrcode');

const transformToQRCode = async text => new Promise((resolve, reject) => {
  QRCode.toDataURL(text, (err, url) => { // eslint-disable-line consistent-return
    if (err) return reject(err);
    resolve(url);
  });
});

module.exports = transformToQRCode;
