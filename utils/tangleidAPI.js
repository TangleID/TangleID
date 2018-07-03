const fetchUserList = () =>
  fetch('/api/fetchUserList')
    .then(response => response.json());

const fetchUserInfo = uuid =>
  fetch(`/api/user/${uuid}`)
    .then(response => response.json());

const fetchClaims = uuid =>
  // forward request to Backend API
  fetch('/api/proxy/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      command: 'get_all_claims',
      uuid,
    }),
  }).then(response => response.json());

const fetchMamMessages = uuid =>
  fetch('/api/mamFetch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ id: uuid }),
  }).then(response => response.json());

const createClaim = (uuid, formValues) => {
  const claim = Object.assign({
    command: 'new_claim',
    uuid,
    part_a: '',
    part_b: '',
    exp_date: '',
    claim_pic: '',
    msg: '',
  }, formValues);

  // forward request to Backend API
  return fetch('/api/proxy/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(claim),
  }).then(response => response.text());
};

module.exports = {
  fetchUserList,
  fetchUserInfo,
  fetchClaims,
  fetchMamMessages,
  createClaim,
};
