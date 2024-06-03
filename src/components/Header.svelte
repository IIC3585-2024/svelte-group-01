<script>
    import { tasks } from "../stores/tasks";
    $: tasksCount = $tasks.length;
</script>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #333;
        color: white;
    }

    h1 {
        margin: 0;
    }

    p {
        margin: 0;
    }
</style>

<header>
    <h1>Task Manager</h1>
    <p>Amount of tasks: {tasksCount}</p>
</header>
