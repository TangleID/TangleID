const fetchUserList = () =>
  fetch('/api/fetchUserList')
    .then(response => response.json());

module.exports = {
  fetchUserList,
};
