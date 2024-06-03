<script>
    import { createEventDispatcher } from 'svelte';
    import msToFormattedTime from '../utils/timeConverter';
    export let isSubscripted, isLapsed, project, name, description, time, duration;
    const dispatch = createEventDispatcher();

    const handlePauseTask = () => dispatch('pause', { project, name, description, duration });

    const handleStartTask = () => dispatch('start', { project, name, description, duration });

    const handleStopTask = () => {
        dispatch('stop', { project, name, description, duration });
        project = name = description = '';
        duration = 0;
    };

</script>

<style>
    .create-task-container {
        display: flex;
        flex-direction: column;
        padding: 10px;
        margin: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    label {
        font-size: 1.2em;
        font-weight: bold;
    }

    input, textarea {
        padding: 5px;
        margin: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .task-controls-container {
        display: flex;
        justify-content: space-between;
    }

    .task-timer-duration {
        font-size: 1em;
    }

    .task-timer-button {
        padding: 5px;
        margin: 5px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .task-timer-button.start {
        background-color: #4CAF50;
        color: white;
    }

    .task-timer-button.pause {
        background-color: #FFC107;
        color: white;
    }

    .task-timer-button.stop {
        background-color: #f44336;
        color: white;
    }
</style>

<section class='create-task-container'>
    <label for='project'>Project</label>
    <input type='text' id='project' name='project' required>

    <label for='name'>Name</label>
    <input type='text' id='name' name='name' required>

    <label for='description'>Description</label>
    <textarea id='description' name='description'></textarea>

    <div class='task-controls-container'>
        {#if isSubscripted}
            <button class='task-timer-button stop' on:click={handleStopTask}>Stop</button>
            <button class='task-timer-button pause' on:click={handlePauseTask}>Pause</button>
            <p class='task-timer-duration'>{msToFormattedTime(time)}</p>
        {:else if isLapsed}
            <button class='task-timer-button stop' on:click={handleStopTask}>Stop</button>
            <button class='task-timer-button start' on:click={handleStartTask}>Start</button>
            <p class='task-timer-duration'>{msToFormattedTime(time)}</p>
        {:else}
            <button class='task-timer-button start' on:click={handleStartTask}>Start</button>
        {/if}
    </div>
</section>
