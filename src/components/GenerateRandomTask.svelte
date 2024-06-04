<script>
  import getExampleTask from '../utils/exampleData';
  import TaskStorage from '../utils/taskStorage';
  import { tasks } from '../stores/tasks';

  let busy = false;

  const handleGenerateTask = async () => {
    busy = true;
    const task = await getExampleTask();
    $tasks = [...$tasks, task];
    TaskStorage.saveTasks($tasks);
    busy = false;
  }
</script>

<style>

</style>

<button disabled={busy} on:click={handleGenerateTask}>Generate Random Task</button>
