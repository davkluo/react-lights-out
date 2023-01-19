/**
 * getRandomState: Return a boolean state true or false provided an argument
 * for the probability of a true state
 *
 * @param {Number} trueChance - Probability of a true state
 */

function getRandomState(trueChance) {
  return Math.random() <= trueChance;
}

export { getRandomState };