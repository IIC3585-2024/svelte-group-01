const formatTime = (seconds: number): string => {
  let hours: number | string = Math.floor(seconds / 3600);
  let minutes: number | string = Math.floor((seconds % 3600) / 60);
  let secs: number | string = seconds % 60;

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  secs = secs < 10 ? '0' + secs : secs;

  return `${hours} : ${minutes} : ${secs}`;
}

export default formatTime;
