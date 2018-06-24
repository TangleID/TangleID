const QRCode = require('qrcode');

const transformToQRCode = async text => new Promise((resolve, reject) => {
  QRCode.toDataURL(text, (err, url) => {
    if (err) return reject(err);
    resolve(url);
  });
});

module.exports = transformToQRCode;
