const random = {
  randInt: (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  },

  mutation: (num) => {
    const randomness = Math.round(num / 10);
    return random.randInt(num - randomness, num + randomness);
  }
}

export default random;
