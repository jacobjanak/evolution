define(function() {

  const config = {
    tileSize: 200,
    plantSize: 20,
    animalSize: 10,
    hungerLoss: 3,
    world: {
      height: 3,
      width: 3
    },
    spawnCount: {
      plants: 200,
      herbivores: 20,
      carnivores: 2
    },
    reproductionRate: {
      plant: 250,
      herbivore: 50,
      carnivore: 30
    }
  };

  return config;
})
