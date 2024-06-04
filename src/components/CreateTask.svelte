<script lang='ts'>
  import { tasks } from '../stores/tasks';
  import TaskStorage from '../utils/taskStorage';
  import GenerateRandomTask from './GenerateRandomTask.svelte';
  let newTask: string = '';
  let newProject: string = '';
  let newGoalTime: number = 0;

  $: canCreateTask = newTask.trim() && newProject.trim() && newGoalTime > 0;

  const addTask = () => {
    if (canCreateTask) {
      $tasks = [...$tasks, {
        project: newProject,
        task: newTask,
        goalTime: newGoalTime,
      }];
      newTask = newProject = '';
      newGoalTime = 0;
    }
    TaskStorage.saveTasks($tasks);
  }
</script>

<style>
  .create-task {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .create-task-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 20px;
  }

  .create-task-input input {
    width: 100%;
    box-sizing: border-box;
  }
</style>

<div class="create-task">
  <div class="create-task-input">
    <label for="project">Project</label>
    <input id="project" type="text" bind:value={newProject} />
  </div>
  <div class="create-task-input">
    <label for="task">Task</label>
    <input id="task" type="text" bind:value={newTask} />
  </div>
  <div class="create-task-input">
    <label for="goal-time">Goal Time (seconds)</label>
    <input id="goal-time" type="number" bind:value={newGoalTime} min="0" />
  </div>
  <button on:click={addTask} disabled={!canCreateTask}>Add Task</button>
  <GenerateRandomTask />
</div>
