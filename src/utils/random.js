const random = {
  randInt: (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  },

  randDecimal: (digits) => {
    return Math.floor(Math.random() * Math.pow(10, digits)) / Math.pow(10, digits);
  },

  randStr: (length) => {
    return (Math.random() + 1).toString(36).substr(2, length)
  },

  mutation: (num) => {
    const randomness = Math.round(num / 10);
    return random.randInt(num - randomness, num + randomness);
  }
}

export default random;
