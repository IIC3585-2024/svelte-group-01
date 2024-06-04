<script lang="ts">
  import Task from './Task.svelte';
  import { tasks } from '../stores/tasks';

  let search: string = '';
  $: filterTasks = $tasks.filter(({project, task}) => {
    return project.toLowerCase().includes(search.toLowerCase())
        || task.toLowerCase().includes(search.toLowerCase())
  });
</script>

<style>
  .search-task-input {
    display: flex;
    flex-direction: column;
    align-items: left;
    text-align: left;
    margin-bottom: 1rem;
  }

  .search-task-input input {
    width: 100%;
    box-sizing: border-box;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  div {
    margin-top: 20px;
  }
</style>

<div>
  <div class="search-task-input">
    <label for="search">Search by project or task</label>
    <input id="search" type="text" bind:value={search} />
  </div>
  {#if filterTasks.length === 0}
    <p>No tasks to show</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Project</th>
          <th>Task</th>
          <th>Goal Time</th>
          <th>Progress</th>
          <th>Timer</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {#each filterTasks as { project, task, goalTime, progress, currentSeconds, currentTime }, index}
          <Task
            index={index}
            project={project}
            task={task}
            goalTime={goalTime}
            progress={progress}
            currentSeconds={currentSeconds}
            currentTime={currentTime}
          />
        {/each}
      </tbody>
    </table>
  {/if}
</div>
