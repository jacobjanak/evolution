define(function() {

  const config = {
    tileSize: 100,
    plantSize: 20,
    animalSize: 10,
    worldDimensions: {
      height: 6,
      width: 10
    },
    spawnCount: {
      plants: 200,
      herbivores: 20,
      carnivores: 10
    },
    reproductionRate: {
      plant: 20,
      herbivore: 20
    }
  };

  return config;
})
