import { readable } from "svelte/store";

const time = readable(0, (set) => {
    set(0);
    const start = new Date().getTime();

    const interval = setInterval(() => {
        const current = new Date().getTime();
        set(current - start);
    }, 1000);

    return () => clearInterval(interval);
});

export default time;
