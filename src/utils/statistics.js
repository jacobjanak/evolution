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
    age: {
      plants: findHighest(plants, 'age'),
      herbivores: findHighest(herbivores, 'age'),
      carnivores: findHighest(carnivores, 'age'),
    },
    offspring: {
      plants: findHighest(plants, 'offspring'),
      herbivores: findHighest(herbivores, 'offspring'),
      carnivores: findHighest(carnivores, 'offspring'),
    },
    kills: {
      carnivores: findHighest(carnivores, 'kills'),
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

function findHighest(arr, k) {
  let highest = 0;
  arr.forEach(el => {
    if (el[k] > highest) highest = el[k];
  })
  return highest;
}

export default statistics;