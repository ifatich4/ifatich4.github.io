<template>
  <div :class="[`doughnut-chart h-full relative`, props.class]">
    <Doughnut
      :data="chartData"
      :options="mergedOptions"
      :plugins="mergedPlugins"
    />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Doughnut } from "vue-chartjs";
import {
  computed,
  ref,
  onUnmounted,
  h,
  render,
  useSlots,
  defineProps,
} from "vue";

ChartJS.register(Title, Tooltip, Legend, ArcElement);
ChartJS.defaults.font.family = getComputedStyle(document.body).fontFamily;
ChartJS.defaults.font.weight = "normal";
ChartJS.defaults.font.size = 12;
ChartJS.defaults.color = "#252528";

/* ========= Simple Deep Merge Helper ========= */
function deepMerge(target, source) {
  const output = { ...target };
  if (typeof target !== "object" || typeof source !== "object") return output;
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

/* ========= Tooltip Shadow Plugin ========= */
const tooltipShadowPlugin = {
  id: "tooltipShadow",
  beforeDraw(chart) {
    const tooltip = chart.tooltip;
    if (tooltip?._active && tooltip.opacity) {
      const ctx = chart.ctx;
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.22)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = tooltip.options.backgroundColor || "#fff";

      const { x, y, width, height } = tooltip;
      const radius = tooltip.options.cornerRadius || 12;
      if (width && height) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
  }
};

/* ========= Props ========= */
const props = defineProps({
  labels: { type: Array, default: () => [] },
  values: { type: Array, default: () => [] },
  colors: { type: Array, default: () => [] },
  class: { type: String, default: "" },
  options: { type: Object, default: () => ({}) },
  plugins: { type: Array, default: () => [] },
});

/* ========= Tooltip Slot ========= */
const slots = useSlots();
const hasTooltipSlot = !!slots.tooltip;
const tooltipElRef = ref(null);

function createTooltipEl(chart) {
  if (tooltipElRef.value) return tooltipElRef.value;
  const el = document.createElement("div");
  el.className = "doughnut-chart-tooltip-slot";
  Object.assign(el.style, {
    position: "absolute",
    pointerEvents: "none",
    zIndex: 10,
    opacity: 0,
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    padding: "8px 12px",
    transition: "opacity 0.3s ease-in-out, left 0.5s ease, top 0.5s ease",
  });

  // ✅ Tempel ke parent container chart agar ikut scroll
  chart.canvas.parentNode.style.position = 'relative';
  chart.canvas.parentNode.appendChild(el);

  tooltipElRef.value = el;
  return el;
}


onUnmounted(() => {
  if (tooltipElRef.value) {
    render(null, tooltipElRef.value);
    tooltipElRef.value.remove();
    tooltipElRef.value = null;
  }
});

/* ========= Custom Tooltip Logic ========= */
function externalTooltip(context) {
  if (!hasTooltipSlot) return;
  const { chart, tooltip } = context;
  const tooltipEl = createTooltipEl(chart);

  // hide
  if (!tooltip || tooltip.opacity === 0) {
    tooltipEl.style.opacity = '0';
    return;
  }

  const dataPoint = tooltip.dataPoints?.[0];
  if (!dataPoint) return;

  const dataset = chart.data.datasets[dataPoint.datasetIndex];
  const slotProps = {
    datasetLabel: dataset?.label,
    label: dataPoint.label ?? chart.data.labels?.[dataPoint.dataIndex],
    value: dataPoint.formattedValue ?? dataPoint.raw,
    raw: dataPoint.raw,
    dataIndex: dataPoint.dataIndex,
    datasetIndex: dataPoint.datasetIndex,
    dataPoint,
    tooltip
  };

  // render slot content
  render(h('div', {}, slots.tooltip(slotProps)), tooltipEl);

  // position AFTER DOM updated (size available)
requestAnimationFrame(() => {
  const canvasRect = chart.canvas.getBoundingClientRect();
  const parentRect = chart.canvas.parentNode.getBoundingClientRect();

  const caretX = typeof tooltip.caretX === 'number' ? tooltip.caretX : tooltip.x || (canvasRect.width / 2);
  const caretY = typeof tooltip.caretY === 'number' ? tooltip.caretY : tooltip.y || (canvasRect.height / 2);

  const tooltipW = tooltipEl.offsetWidth;
  const tooltipH = tooltipEl.offsetHeight;

  let left = caretX - (canvasRect.left - parentRect.left);
  let top  = caretY - (canvasRect.top  - parentRect.top);

  const GAP = 6;

  if (tooltip.yAlign === 'top') {
    top -= (tooltipH + GAP);
  } else if (tooltip.yAlign === 'bottom') {
    top += GAP;
  } else {
    top -= tooltipH / 2;
  }

  if (tooltip.xAlign === 'left') {
    left -= (tooltipW + GAP);
  } else if (tooltip.xAlign === 'right') {
    left += GAP;
  } else {
    left -= tooltipW / 2;
  }

  tooltipEl.style.left = `${Math.round(left)}px`;
  tooltipEl.style.top = `${Math.round(top)}px`;
  tooltipEl.style.opacity = '1';

  tooltipEl.classList.remove('caret-left', 'caret-right');
  if (tooltip.xAlign === 'left') {
    tooltipEl.classList.add('caret-left');
  } else if (tooltip.xAlign === 'right') {
    tooltipEl.classList.add('caret-right');
  } else {
    tooltipEl.classList.add('caret-left');
  }
});

}


/* ========= Chart Data ========= */
const defaultColors = [
  "#42b883",
  "#36a2eb",
  "#ffcd56",
  "#ff6384",
  "#9966ff",
  "#4bc0c0",
];

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    { 
      data: props.values,
      backgroundColor: props.colors.length
          ? props.colors
          : defaultColors.slice(0, props.values.length),
      hoverOffset: 0,
      borderWidth: 0,
      spacing: 12,
    },
  ],
}));

/* ========= Default Options ========= */
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
       labels: {
        font: { size: 14 },
        usePointStyle: true,
        pointStyle: 'rectRounded',
        padding: 24,
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#fff",
      titleColor: "#252528",
      bodyColor: "#252528",
      cornerRadius: 12,
      padding: 12,
    },
  },
};

/* ========= Deep Merge Options ========= */
const mergedOptions = computed(() => {
  const combined = deepMerge(defaultOptions, props.options);
  combined.plugins.tooltip = {
    ...combined.plugins.tooltip,
    enabled: !hasTooltipSlot,
    external: hasTooltipSlot ? externalTooltip : combined.plugins.tooltip.external,
  };
  return combined;
});

/* ========= Combine Plugins ========= */
const mergedPlugins = computed(() => {
  const internal = hasTooltipSlot ? [] : [tooltipShadowPlugin];
  const pluginIds = new Set(internal.map(p => p.id));
  const external = props.plugins.filter(p => !pluginIds.has(p.id));
  return [...internal, ...external];
});
</script>

<style>
.doughnut-chart-tooltip-slot {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  padding: 8px 12px;
  font-size: 13px;
  position: absolute;
}

/* Caret kanan */
.doughnut-chart-tooltip-slot.caret-right::after {
  content: "";
  position: absolute;
  top: 50%;
  left: -6px;
  transform: translateY(-50%);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid #fff;
}

/* Caret kiri */
.doughnut-chart-tooltip-slot.caret-left::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -6px;
  transform: translateY(-50%);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid #fff;
}
</style>