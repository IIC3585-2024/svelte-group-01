<script lang="ts">
    export let progress: number;
  </script>
  
  <div class="progress-bar">
    <div class="progress" style="width: {progress}%"></div>
  </div>
  
  <style>
    .progress-bar {
      width: 100%;
      background-color: #e0e0e0;
      border-radius: 10px;
      overflow: hidden;
      height: 20px;
      margin-top: 10px;
    }
  
    .progress {
      height: 100%;
      background-color: red;
      width: 0;
      transition: width 0.5s;
    }
  </style>
  