<script lang='ts'>
  import Timer from './Timer.svelte';
  import ProgressBar from './ProgressBar.svelte';
  import { tasks } from '../stores/tasks';
  import formatTime from '../utils/formatTime';
  import TaskStorage from '../utils/taskStorage';

  export let project: string;
  export let task: string;
  export let goalTime: number;
  export let progress: number;
  export let currentSeconds: number;
  export let currentTime: string;
  export let index: number;

  const updateProgress = (ev: CustomEvent) => {
    $tasks = $tasks.map((task, i) => i === index ? {
      ...task,
      progress: ev.detail.progress,
      currentSeconds: ev.detail.sec,
      currentTime: ev.detail.taskTime,
    } : task);
    TaskStorage.saveTasks($tasks);
  }

  const removeTask = () => {
    $tasks = $tasks.filter((task, i) => i !== index);
    TaskStorage.saveTasks($tasks);
  }
</script>

<style>
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  .task-options {
    text-align: center;
  }

  .remove-task-button {
    background-color: red;
    background-image: url(../assets/delete.svg);
    background-position: 50%;
    background-size: 50%;
    background-repeat: no-repeat;
    border: none;
    padding: 8px;
    margin: 4px 2px;
    cursor: pointer;
    height: 2rem;
    width: 2rem;
  }

  .remove-task-button:hover {
    background-color: darkred;
  }
</style>

<tr>
  <td>{project}</td>
  <td>{task}</td>
  <td>{formatTime(goalTime)}</td>
  <td><ProgressBar {progress} /></td>
  <td><Timer
    goalTime={goalTime}
    sec={currentSeconds}
    taskTime={currentTime}
    on:progress={(ev) => updateProgress(ev)}/>
  </td>
  <td class="task-options">
    <button class="remove-task-button" on:click={() => removeTask()}/>
  </td>
</tr>
