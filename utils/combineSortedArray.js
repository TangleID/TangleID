const deepCopy = require('./deepCopy');

const combineSortedArray = (arr1, arr2, cmp) => {
  let target = deepCopy(arr1);
  let idx = 0;

  for (let i = 0; i < arr2.length; idx++) {
    if (idx === target.length) {
      target = target.concat(arr2.slice(i));
      break;
    }
    if (cmp(target[idx], arr2[i])) {
      target.splice(idx, 0, arr2[i]);
      i++;
    }
  }
  return target;
};

module.exports = combineSortedArray;
