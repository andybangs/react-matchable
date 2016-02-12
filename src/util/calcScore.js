// calcScore :: Number -> Number -> String
export default function calcScore(numCorrect, numTotal) {
  return `${Math.round(Math.round((numCorrect / numTotal) * 1000) / 10)}%`;
}
