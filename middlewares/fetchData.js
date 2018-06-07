import fetch from 'isomorphic-unfetch';

const DEFAULT_HOST = process.env.API_HOST;
const isJSONResponse = response => response.headers.get('content-type').startsWith('application/json');
const isJSONString = (text) => {
  let result;
  try {
    result = JSON.parse(text);
  } catch (e) {
    result = false;
  }
  return result;
};

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const fetchData = async (
  host,
  endpoint,
  method = 'GET',
  body,
  label,
) => {
  const fullUrl = (!host) ? DEFAULT_HOST + endpoint : host + endpoint;
  const options = (method === 'GET') ? { method, mode: 'cors' } : {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  };

  const res = await fetch(fullUrl, options);
  if (!res.ok) return Promise.reject(res.statusText);

  let result;
  if (isJSONResponse(res)) {
    const json = await res.json();
    result = json;
  } else {
    const text = await res.text();
    const json = isJSONString(text);
    if (json) {
      result = json;
    } else {
      result = { text };
    }
  }
  console.log('label: ', label);
  if (label) {
    result = Object.assign({}, result, label);
  }
  return Promise.resolve(result);
};

export default fetchData;
