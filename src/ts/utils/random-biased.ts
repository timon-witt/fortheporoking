/**
 * Selects a random index given biases.
 * @param {number[]} biases - A list of numbers representing biases.
 * @returns {number} An index in the list, selected based on the given biases.
 */
export default (biases: number[]) => {
  biases = biases.sort((a, b) => a - b);
  const total = biases.reduce((prev, curr) => prev + curr);
  let random = Math.random() * total;
  let i = 0;

  for (i; i < biases.length; i++) {
    if (random < biases[i]) {
      return i;
    }

    random -= biases[i];
  }

  return -1;
};