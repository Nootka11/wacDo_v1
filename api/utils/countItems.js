// Compte le nombre de fois que chaque ID apparaît dans une liste
const countItems = (ids = []) => {
  return ids.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});
};

module.exports = { countItems };
