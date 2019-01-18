import QRCode from 'qrcode';

import styles from './styles';

const displayQrCodeModal = async requestUri => {
  const qrcodeSVG = await QRCode.toString(requestUri, {
    margin: 0
  });
  return `
    <div style="${styles.wrap}">
      <div style="${styles.modal}">
        <div style="${styles.header}">
          Connect with TangleID
        </div>
        <div>
          <p>Scan QR code with TangleID App</p>

          <div style="${styles.svgWrap}">
            ${qrcodeSVG}
          </div>

        </div>
      </div>
      <div id="tangleid-backdrop" style="${styles.backdrop}" />
    </div>
    `;
};

export default displayQrCodeModal;
