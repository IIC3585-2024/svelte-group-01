/**
* @param num {number}
*/
const zeroPrefix = (num) => num < 10 ? `0${num}` : num;

/**
* @param ms {number}
*/
const msToFormattedTime = (ms) => {
    const mm = zeroPrefix(Math.floor(ms / 1000 / 60));
    const ss = zeroPrefix(Math.floor(ms / 1000) % 60);
    const hh = zeroPrefix(Math.floor(ms / 1000 / 60 / 60));
    return `${hh}:${mm}:${ss}`;
}

export default msToFormattedTime;
