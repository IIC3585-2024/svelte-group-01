<script lang="ts">
  export let progress: number;
</script>

<style>
  .progress-bar {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    height: 20px;
  }

  .progress {
    height: 100%;
    background-color: red;
    width: 0;
    transition: width 0.5s;
  }

  .progress.complete {
    background-color: green;
  }
</style>

<div class="progress-bar">
  <div class={"progress " + (progress >= 100 ? "complete" : "")} style="width: {progress}%"></div>
</div>
