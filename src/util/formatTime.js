// getSeconds :: Number -> String
function getSeconds(seconds) {
  return (`0${seconds % 60}`).slice(-2);
}

// getSeconds :: Number -> String
function getMinutes(seconds) {
  return Math.floor(seconds / 60).toString();
}

// formatTime :: Number -> String
export default function formatTime(seconds) {
  return `${getMinutes(seconds)}:${getSeconds(seconds)}`;
}
