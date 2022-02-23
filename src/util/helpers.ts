export const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export function msToTime(duration) {
  // const milliseconds = Math.floor((duration % 1000) / 100);
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return {
    hours,
    minutes,
    seconds,
    isZero: seconds <= 0 && minutes <= 0 && hours <= 0,
  };
}

export function padTimeWithZero(time) {
  return time < 10 ? `0${time}` : `${time}`;
}
