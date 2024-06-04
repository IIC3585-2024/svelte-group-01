<script>
  import { onMount } from "svelte";
  import { tasks } from "./stores/tasks";
  import CreateTask from "./components/CreateTask.svelte";
  import Header from "./components/Header.svelte";
  import Table from "./components/Table.svelte"
  import TaskStorage from "./utils/taskStorage";

  onMount(() => {
    $tasks = TaskStorage.getTasks();
  });
</script>

<main>
  <Header/>
  <CreateTask/>
  <Table/>
</main>

<style>

</style>
