define(function() {

  const config = {
    hungerLoss: 3,
    size: {
      tile: 200,
      plant: 20,
      animal: 10
    },
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
      plant: 100,
      herbivore: 50,
      carnivore: 30
    }
  };

  return config;
})
