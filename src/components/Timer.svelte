<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import formatTime from '../utils/formatTime';

  export let goalTime: number;
  export let sec: number = 0;
  export let taskTime: string = "00 : 00 : 00";

  let isRunning: boolean = false;
  let timer: number | undefined;
  let progress: number = 0;

  const dispatch = createEventDispatcher();

  const updateTaskTime = () => {
    taskTime = formatTime(sec);
    updateProgress();
  }

  const updateProgress = () => {
    progress = Math.min((sec / goalTime) * 100, 100);
    dispatch('progress', { progress, sec, taskTime });
  }

  const startTimer = () => {
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

  const pauseTimer = () => {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
  }

  const toggleTimer = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
    isRunning = !isRunning;
  }

  const resetTimer = () => {
    pauseTimer();
    sec = 0;
    updateTaskTime();
    isRunning = false;
  }
</script>

<style>
  .timer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-left: 0.7rem;
  }

  .timer-time {
    font-size: 1.2rem;
  }

  .timer-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .timer-button {
    background-color: #333;
    color: white;
    border: none;
    padding: 1rem 1.5rem;
    margin: 0.5rem;
    cursor: pointer;
    background-size: 30%;
    background-repeat: no-repeat;
    background-position: 50%;
  }

  .timer-button:hover {
    background-color: #555;
  }

  .timer-button:disabled {
    filter: brightness(0.5);
    cursor: not-allowed;
  }

  .timer-button:disabled:hover {
    background-color: #333;
  }

  .timer-button.play {
    background-image: url('../assets/play.svg');
  }

  .timer-button.pause {
    background-image: url('../assets/pause.svg');
  }

  .timer-button.stop {
    background-image: url('../assets/stop.svg');
  }
</style>

<div class="timer">
  <div class="timer-time">
    {taskTime}
  </div>
  <div class="timer-buttons">
    {#if isRunning}
      <button class="timer-button pause" on:click={toggleTimer}/>
    {:else}
      <button class="timer-button play" disabled={progress >= 100} on:click={toggleTimer}/>
    {/if}
    <button class="timer-button stop" disabled={sec === 0} on:click={resetTimer}/>
  </div>
</div>
