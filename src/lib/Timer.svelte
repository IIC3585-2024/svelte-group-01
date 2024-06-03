<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let goalTime: number;

  let taskTime: string = "00 : 00 : 00";
  let isRunning: boolean = false;
  let timer: number | undefined;
  let sec: number = 0;
  let progress: number = 0;

  const dispatch = createEventDispatcher();

  function formatTime(seconds: number): string {
    let hours: number | string = Math.floor(seconds / 3600);
    let minutes: number | string = Math.floor((seconds % 3600) / 60);
    let secs: number | string = seconds % 60;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    secs = secs < 10 ? '0' + secs : secs;

    return `${hours} : ${minutes} : ${secs}`;
  }

  function updateTaskTime() {
    taskTime = formatTime(sec);
    updateProgress();
  }

  function updateProgress() {
    progress = Math.min((sec / goalTime) * 100, 100);
    dispatch('progress', { progress });
  }

  function startTimer() {
    updateTaskTime();
    timer = setInterval(() => {
      sec++;
      updateTaskTime();
      if (sec >= goalTime) {
        pauseTimer();
        isRunning = false;
      }
    }, 1000);
  }

  function pauseTimer() {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
  }

  function toggleTimer() {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
    isRunning = !isRunning;
  }

  function resetTimer() {
    pauseTimer();
    sec = 0;
    updateTaskTime();
    isRunning = false;
  }
</script>

<div>
  <div>
    {taskTime}
  </div>
  <button on:click={toggleTimer}>{isRunning ? 'Pause' : 'Play'}</button>
  <button on:click={resetTimer}>Reset</button>
</div>
