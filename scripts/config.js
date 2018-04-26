define(function() {

  const config = {
    tileSize: 50,
    plantSize: 20,
    animalSize: 10,
    world: {
      height: 12,
      width: 20
    },
    spawnCount: {
      plants: 200,
      herbivores: 20,
      carnivores: 10
    },
    reproductionRate: {
      plant: 50,
      herbivore: 30
    }
  };

  return config;
})
