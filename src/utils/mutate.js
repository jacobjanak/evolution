import { random } from '../utils';

function mutate(num, variation = false) {
  if (!variation) variation = Math.round(num / 10);
  
  let gene = random(num - variation, num + variation);
  if (gene < 0) gene = 0;
  
  return gene;
}

export default mutate;
