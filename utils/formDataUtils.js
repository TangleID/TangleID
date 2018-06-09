const convertToObject = (formData) => {
  const data = {};
  for (const key of formData.keys()) {
    data[key] = formData.get(key);
  }
  return data;
};

export default { convertToObject };
