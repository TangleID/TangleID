import BaseExtension from './tangleid/BaseExtension';
import handleErrors from './tangleid/handleErrors';

class LocalExtension extends BaseExtension {
  constructor(settings) {
    super('local'); // register extension namespace
    this.provider = settings.provider;
  }

  fetchUserList() {
    return fetch(`${this.provider}/fetchUserList`)
      .then(handleErrors)
      .then(response => response.json())
      .catch((error) => {
        console.error(error);
      });
  }

  fetchUserInfo(uuid) {
    return fetch(`${this.provider}/user/${uuid}`)
      .then(handleErrors)
      .then(response => response.json())
      .catch((error) => {
        console.error(error);
      });
  }

  fetchMamMessages(uuid) {
    return fetch(`${this.provider}/mamFetch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ id: uuid }),
    })
      .then(handleErrors)
      .then(response => response.json())
      .catch((error) => {
        console.error(error);
      });
  }
}

export default LocalExtension;

