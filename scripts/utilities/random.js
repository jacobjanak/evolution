define(function() {

  let random = {
    randInt: (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    randStr: (length) => {
      return (Math.random() + 1).toString(36).substr(2, length)
    }
  }

  return random;
})
