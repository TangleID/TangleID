import displayQrCodeModal from './ui/QrCodeModal';

class QrCodeHandler {
  async openQrCode(requestUrl) {
    let wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'tangleid-wrapper');

    wrapper.innerHTML = await displayQrCodeModal(requestUrl);

    const cancelListener = event => {
      this.closeQrCode();
    };

    document.body.appendChild(wrapper);

    document
      .getElementById('tangleid-backdrop')
      .addEventListener('click', cancelListener);
  }

  closeQrCode() {
    const wrapper = document.getElementById('tangleid-wrapper');
    document.body.removeChild(wrapper);
  }
}

export default QrCodeHandler;
