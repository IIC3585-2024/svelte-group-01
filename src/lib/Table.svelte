<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Timer from './Timer.svelte';
    import ProgressBar from './ProgressBar.svelte';
    
    interface Task {
      task: string;
      project: string;
      goalTime: number;
      progress: number;
    }
    
    let tasks: Task[] = [];
    let newTask: string = '';
    let newProject: string = '';
    let newGoalTime: number = 0;
    
    const dispatch = createEventDispatcher();
  
    function addTask() {
      if (newTask.trim() && newProject.trim() && newGoalTime > 0) {
        tasks = [...tasks, { task: newTask, project: newProject, goalTime: newGoalTime, progress: 0 }];
        newTask = '';
        newProject = '';
        newGoalTime = 0;
      }
    }
    
    function updateProgress(index: number, event: CustomEvent) {
      tasks = tasks.map((task, i) => i === index ? { ...task, progress: event.detail.progress } : task);
      dispatch('taskUpdated', { tasks });
    }
  </script>
  
  <div>
    <input type="text" placeholder="Task" bind:value={newTask} />
    <input type="text" placeholder="Project" bind:value={newProject} />
    <input type="number" placeholder="Goal Time (seconds)" bind:value={newGoalTime} min="0" />
    <button on:click={addTask}>Add Task</button>
  </div>
  
  <div>
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Project</th>
          <th>Goal Time</th>
          <th>Progress</th>
          <th>Timer</th>
        </tr>
      </thead>
      <tbody>
        {#each tasks as { task, project, goalTime, progress }, index}
          <tr>
            <td>{task}</td>
            <td>{project}</td>
            <td>{goalTime} seconds</td>
            <td><ProgressBar {progress} /></td>
            <td><Timer {goalTime} on:progress={(event) => updateProgress(index, event)} /></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }
  
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
  
    div {
      margin-top: 20px;
    }
  
    input {
      margin-right: 10px;
    }
  </style>
  