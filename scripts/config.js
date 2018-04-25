define(function() {

  const config = {
    tileSize: 100,
    plantSize: 20,
    animalSize: 10,
    world: {
      height: 6,
      width: 10
    },
    spawnCount: {
      plants: 200,
      herbivores: 60,
      carnivores: 10
    },
    reproductionRate: {
      plant: 50,
      herbivore: 20
    }
  };

  return config;
})
