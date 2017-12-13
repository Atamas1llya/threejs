module.exports = (size) => {
  const map = [];

  for (let i = 0; i < size; i++) {
    map.push([]);
    for (let j = 0; j < size; j++) {
      map[i].push(1);
    }
  }

  return map;
}
