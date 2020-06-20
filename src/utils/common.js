export const deepCopy = (obj) => {
  let value;
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    value = obj[key];
    result[key] = typeof value === 'object' && value !== null ? deepCopy(value) : value;
  }
  return result;
}