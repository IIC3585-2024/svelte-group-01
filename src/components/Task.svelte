<script>
    import { createEventDispatcher } from 'svelte';
    import dateToTime from '../utils/dateToTime.js';
    export let id, project, name, description, duration;
    const dispatch = createEventDispatcher();

    function handleEdit() {
        dispatch('edit', { id, project, name, description, duration });
    }

    function handleDelete() {
        dispatch('delete', { id });
    }
</script>

<style>
    .task-container {
        display: flex;
        flex-direction: column;
        padding: 10px;
        margin: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .task-project {
        font-size: 1.5em;
        font-weight: bold;
    }

    .task-name {
        font-size: 1.2em;
        font-weight: bold;
    }

    .task-description {
        font-size: 1em;
    }

    .task-duration {
        font-size: 1em;
    }

    .task-button-container {
        display: flex;
        justify-content: space-between;
    }

    .task-button {
        padding: 5px;
        margin: 5px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .task-button.edit {
        background-color: #4CAF50;
        color: white;
    }

    .task-button.delete {
        background-color: #f44336;
        color: white;
    }
</style>

<div class='task-container'>
    <p class='task-project'>{project}</p>
    <p class='task-name'>{name}</p>
    <p class='task-description'>{description}</p>
    <p class='task-duration'>{dateToTime(duration)}</p>
    <div class='task-button-container'>
        <button class='task-button edit' on:click={handleEdit}>&#9658</button>
        <button class='task-button delete' on:click={handleDelete}>X</button>
    </div>
</div>
