import { random } from '../utils';

function mutate(num) {
  const randomness = Math.round(num / 10);
  return random(num - randomness, num + randomness);
}

export default mutate;
