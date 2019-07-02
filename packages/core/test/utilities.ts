export const generateSeed = (length = 81) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  let buffer = '';
  for (let i = 0; i < length; i++) {
    buffer += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return buffer;
};
