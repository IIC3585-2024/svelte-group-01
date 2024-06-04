<script lang='ts'>
  import { onMount } from "svelte";
  import { tasks } from "./stores/tasks";
  import CreateTask from "./components/CreateTask.svelte";
  import Header from "./components/Header.svelte";
  import Table from "./components/Table.svelte"
  import TaskStorage from "./utils/taskStorage";
  import ProjectsCharge from "./components/ProjectsCharge.svelte";

  onMount(() => {
    $tasks = TaskStorage.getTasks();
  });

  let option: string = "tasks";
</script>

<style>
  main {
    min-width: 50rem;
  }

  .options-bar {
    display: flex;
    gap: 1rem;
    width: 100%;
    margin-bottom: 1rem;
  }

  .options-button {
    padding: 0.5rem 1rem;
    flex-grow: 1;
    border: none;
    background-color: #333;
    cursor: pointer;
  }

  .options-button:hover {
    background-color: rgb(100, 100, 100)
  }

  .options-button:disabled:hover {
    background-color: #333;
    cursor: not-allowed;
  }
</style>

<main>
  <Header/>
  <div class="options-bar">
    <button class="options-button" disabled={option === "tasks"} on:click={() => option = "tasks"}>Tasks</button>
    <button class="options-button" disabled={option === "report"} on:click={() => option = "report"}>Report</button>
  </div>
  {#if option === "tasks"}
    <CreateTask/>
    <Table/>
  {:else}
    <ProjectsCharge/>
  {/if}
</main>
