export const webReceieve = async url => {
  var data = await fetch(url).then(async response => {
    var data = await response.json();
    return data;
  });
  return data;
};

export const webAttach = (url, body) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-IOTA-API-VERSION": "1.4.1"
    },
    body: JSON.stringify(body)
  });
};
