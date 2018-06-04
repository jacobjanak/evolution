import { random } from '../utils';

function mutate(num, variation = false) {
  if (!variation) variation = Math.round(num / 10);
  return random(num - variation, num + variation);
}

export default mutate;
