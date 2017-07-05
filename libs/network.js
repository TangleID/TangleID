export const retrieve = async url => {
  var data = await fetch(url).then(async response => {
    var data = await response.json();
    return data;
  });
  return data;
};

export const attach = (url, body) => {
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
};
