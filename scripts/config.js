define(function() {

  const config = {
    tileSize: 50,
    plantSize: 20,
    animalSize: 10,
    hungerLoss: 5,
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
      plant: 30,
      herbivore: 50
    }
  };

  return config;
})
