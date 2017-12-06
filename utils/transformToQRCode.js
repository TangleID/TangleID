const QRCode = require('qrcode')

const transformToQRCode = async (text) => {
	return new Promise((resolve, reject) => {
		QRCode.toDataURL(text, function (err, url) {
			if (err) return reject(err)
			resolve(url)
		})
	})
}

module.exports = transformToQRCode
