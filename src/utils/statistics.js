function statistics(plants, herbivores, carnivores) {
  const values = {
    count: {
      plants: plants.length,
      herbivores: herbivores.length,
      carnivores: carnivores.length,
    },
    preference: {
      herbivores: findAverage(herbivores, 'preference'),
      carnivores: findAverage(carnivores, 'preference'),
    },
    speed: {
      herbivores: findAverage(herbivores, 'speed'),
      carnivores: findAverage(carnivores, 'speed'),
    },
  };

  return values;
}

function findAverage(arr, k) {
  if (arr.length === 0) return false;

  let sum = 0;
  arr.forEach(el => sum += el[k])

  return sum / arr.length;
}

export default statistics;