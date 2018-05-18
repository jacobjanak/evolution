let i;

const spawn = (Model, count, settings = {}) => {
  const spawned = [];
  for (i = 0; i < count; i++) {
    spawned.push(new Model(settings))
  }
  return spawned;
}

export default spawn;
