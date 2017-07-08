export const deleteItem = (key, object) => {
  let newObject = object;
  delete newObject[key];
  return newObject;
}

export const addItem = (key, item, object) => {
  let newObject = object;
  newObject[key] = item;
  return newObject;
}
