<script>
    import { tasks } from "../stores/tasks";
    import Task from "./Task.svelte";
    let name = '', project = '', previous, changingTask = false;

    /**
     * @param {CustomEvent} e
     */
    const handleDeleteTask = (e) => {
        $tasks = $tasks.filter(task => task.id !== e.detail.id);
        // TaskApi.saveTasks($tasks);
    }

    /**
     * @param {CustomEvent} e
     */
    // const handleEditTask = (e) =>{
    //     name = e.detail.name;
    //     project = e.detail.project;
    //     previous = e.detail.duration;
    //     changingTask = true;
    //     handleStartTask(e);
    // }

</script>

<style>
    .tasks-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>

<section class='tasks-container'>
    {#each $tasks as task}
        <Task
            id={task.id}
            project={task.project}
            name={task.name}
            description={task.description}
            duration={task.duration}
            on:delete={handleDeleteTask}
        />
    {/each}
</section>
