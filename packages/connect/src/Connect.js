import openSocket from 'socket.io-client';

import QrCodeHandler from './QrCodeHandler';

class Connect {
  constructor(options = {}) {
    this.provider = options.provider;
    this.uiHandler = new QrCodeHandler();
  }

  requestCredentials() {
    return new Promise((resolve, reject) => {
      this.socket = openSocket(this.provider, {
        reconnection: false,
        autoConnect: false
      });

      this.socket.on('connect_error', error => {
        this.onConnectError(error, reject);
      });

      this.socket.on('token', requestUrl => {
        this.onRequestUrlReceived(requestUrl);
      });

      this.socket.on('credentials', credentials => {
        this.onCredentialsReceived(credentials, resolve);
      });

      this.socket.connect();
    });
  }

  onConnectError(error, reject) {
    console.log('onConnectError', error);
    reject(error);
  }

  onRequestUrlReceived(requestUrl) {
    console.log('onRequestUrlReceived', requestUrl);
    this.uiHandler.openQrCode(requestUrl);
  }

  onCredentialsReceived(credentials, resolve) {
    console.log('onCredentialsReceived', credentials);
    this.uiHandler.closeQrCode();

    resolve(credentials);
  }

  stopRequest() {
    this.socket.removeAllListeners();
  }
}

export default Connect;
