function convertTimeToMilliseconds(time) {
  const timeString = time?.toString();

  const regex = /^(\d+)(ms|s)$/;
  const match = timeString?.match(regex);

  if (!match) {
    return
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  if (unit === 'ms') {
      return value;
  } else if (unit === 's') {
      return value * 1000;
  }
}

console.log(convertTimeToMilliseconds('200ms'));
console.log(convertTimeToMilliseconds('2s'));