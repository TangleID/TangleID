import snakeCase from 'lodash/snakeCase';

const transformParams = source => Object.keys(source).reduce((acc, cur) => {
  const current = snakeCase(cur);
  acc[current] = source[cur];
  return acc;
}, {});

export default transformParams;
