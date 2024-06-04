<script lang="ts">
  import { scaleLinear } from 'd3-scale';
  import { tasks } from '../stores/tasks';

  $: points = $tasks.reduce((acc, task) => {
    const existingProject = acc.find(project => project.projectName === task.project);
    if (existingProject) {
      existingProject.totalTime += task.goalTime;
    } else {
      acc.push({ projectName: task.project, totalTime: task.goalTime });
    }
    return acc;
  }, []);

  const padding = { top: 20, right: 15, bottom: 40, left: 40 };
  let width = 500;
  let height = 300;

  $: xScale = scaleLinear()
    .domain([0, points.length])
    .range([padding.left, width - padding.right]);

  $: yScale = scaleLinear()
    .domain([0, Math.max(...points.map(point => point.totalTime))])
    .range([height - padding.bottom, padding.top]);

  $: innerWidth = width - (padding.left + padding.right);
  $: barWidth = innerWidth / points.length;
</script>

<h2>Total Time by Project</h2>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
  <svg>
    <g class="axis y-axis">
      {#each yScale.ticks(5) as tick}
        <g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
          <line x2="100%" />
          <text x="-5" y="5">{tick}</text>
        </g>
      {/each}
    </g>

    <g class="axis x-axis">
      {#each points as point, i}
        <g class="tick" transform="translate({xScale(i)},{height - padding.bottom})">
          <text x={barWidth / 2} y="20" transform="rotate(-45)">{point.projectName}</text>
        </g>
      {/each}
    </g>

    <g class="bars">
      {#each points as point, i}
        <rect
          x={xScale(i) + 2}
          y={yScale(point.totalTime)}
          width={barWidth - 4}
          height={yScale(0) - yScale(point.totalTime)}
        />
      {/each}
    </g>
  </svg>
</div>

<style>
  h2 {
    text-align: center;
  }
  .chart {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
  svg {
    position: relative;
    width: 100%;
    height: 300px;
  }
  .tick {
    font-family: Helvetica, Arial;
    font-size: 0.725em;
    font-weight: 200;
  }
  .tick line {
    stroke: #e2e2e2;
    stroke-dasharray: 2;
  }
  .tick text {
    fill: #ccc;
    text-anchor: start;
  }
  .tick.tick-0 line {
    stroke-dasharray: 0;
  }
  .x-axis .tick text {
    text-anchor: middle;
  }
  .bars rect {
    fill: #a11;
    stroke: none;
    opacity: 0.65;
  }
</style>
