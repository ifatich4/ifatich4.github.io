<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";
import { Bar } from "vue-chartjs";
import {
  computed,
  ref,
  onUnmounted,
  h,
  render,
  useSlots,
  defineProps,
} from "vue";

ChartJS.defaults.font.family = getComputedStyle(document.body).fontFamily;
ChartJS.defaults.font.weight = "normal";
ChartJS.defaults.font.size = 12;
ChartJS.defaults.color = "#252528";

function drawRoundedRect(ctx, x, y, width, height, radius) {
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
      ctx.fillStyle = tooltip.options.backgroundColor;

      const { x, y, width, height } = tooltip;
      const radius = tooltip.options.cornerRadius || 12;
      drawRoundedRect(ctx, x, y, width, height, radius);
      ctx.restore();
    }
  }
};

// ✅ Plugin custom garis vertikal + tick kecil di atas value
const verticalLinePlugin = {
  id: "verticalLineInBar",
  beforeDatasetsDraw(chart) {
    const opts = chart.options.plugins.verticalLineInBar || {};
    if (!opts.show) return;

    const {
      ctx,
      chartArea: { top, bottom },
      scales: { x }
    } = chart;

    chart.data.labels.forEach((_, i) => {
      const barCenter = x.getPixelForTick(i);

      // 🔹 garis vertikal
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(barCenter, top);
      ctx.lineTo(barCenter, bottom);
      ctx.lineWidth = opts.lineWidth || 1;
      ctx.strokeStyle = opts.color || "#999";
      ctx.stroke();
      ctx.restore();

      // 🔹 garis tick kecil (kayak strip di atas label)
      const tickLength = opts.tickLength || 6; 
      const tickColor = "#777777";

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(barCenter, bottom); // dari sumbu bawah
      ctx.lineTo(barCenter, bottom + tickLength); // ke bawah dikit
      ctx.lineWidth = 1;
      ctx.strokeStyle = tickColor;
      ctx.stroke();
      ctx.restore();
    });
  }
};

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  labels: { type: Array, required: true },
  datasets: { type: Array, required: true },
  options: { type: Object, default: () => ({}) },
  showVerticalLine: { type: Boolean, default: true }
});

const slots = useSlots();
const hasTooltipSlot = !!slots.tooltip;
const tooltipElRef = ref(null);

function createTooltipElIfNeeded(chart) {
  if (tooltipElRef.value) return tooltipElRef.value;
  const el = document.createElement("div");
  el.className = "barchart-tooltip-slot";
  Object.assign(el.style, {
    position: "absolute",
    pointerEvents: "none",
    zIndex: "99",
    opacity: "0",
    transition: "opacity 0.3s ease, left 0.2s ease, top 0.2s ease",
    willChange: "left, top, opacity",
  });
  
  chart.canvas.parentNode.style.position = "relative";
  chart.canvas.parentNode.appendChild(el);
  tooltipElRef.value = el;
  return el;
}

onUnmounted(() => {
  if (tooltipElRef.value) {
    try {
      render(null, tooltipElRef.value); // unmount vue render
    } catch (e) { /* empty */ }
    if (tooltipElRef.value.parentNode) tooltipElRef.value.parentNode.removeChild(tooltipElRef.value);
    tooltipElRef.value = null;
  }
});

// external tooltip function (will be used ONLY when hasTooltipSlot === true)
function externalTooltip(context) {
  if (!hasTooltipSlot) return;
  const { chart, tooltip } = context;
  const tooltipEl = createTooltipElIfNeeded(chart);

  if (!tooltip || tooltip.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  const dataPoint = tooltip.dataPoints?.[0];
  if (!dataPoint) {
    tooltipEl.style.opacity = "0";
    return;
  }

  // slot props
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

  // render custom slot
  render(h("div", {}, slots.tooltip(slotProps)), tooltipEl);

  // posisi relatif ke container chart
  const caretX = tooltip.caretX;
  const caretY = tooltip.caretY;
  const tooltipWidth = tooltipEl.offsetWidth || 120;
  const tooltipHeight = tooltipEl.offsetHeight || 40;

  const left = caretX;
  const top = caretY;
  const centerX = chart.width / 2;

  if (left > centerX) {
    tooltipEl.classList.add("caret-left");
    tooltipEl.classList.remove("caret-right");
    tooltipEl.style.left = `${left - tooltipWidth - 12}px`;
  } else {
    tooltipEl.classList.add("caret-right");
    tooltipEl.classList.remove("caret-left");
    tooltipEl.style.left = `${left + 12}px`;
  }

  tooltipEl.style.top = `${top - tooltipHeight / 2}px`;
  tooltipEl.style.opacity = "1";
}


// styledDatasets sama seperti kode awal
const defaultColors = [
  "#42b883",
  "#36a2eb",
  "#ff6384",
  "#ffcd56",
  "#4bc0c0",
  "#9966ff"
];
const styledDatasets = computed(() => {
  if (props.datasets.length === 1) {
    return props.datasets.map((ds) => {
      const colors = ds.backgroundColorsArray
        ? ds.backgroundColorsArray
        : defaultColors.slice(0, ds.data.length);

      return {
        ...ds,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      };
    });
  } else {
    return props.datasets.map((ds, i) => {
      const color = ds.backgroundColor || defaultColors[i % defaultColors.length];
      return {
        ...ds,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1
      };
    });
  }
});

// defaultOptions (tooltip options kept, but we'll override enabled/external later)
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
     tooltip: {
      // note: enabled will be overridden by mergedOptions below depending on slot
      enabled: true,
      backgroundColor: "#FFFFFF",
      titleColor: "#252528",
      bodyColor: "#252528",
      cornerRadius: 12,
      padding: 16, 
      usePointStyle: true,
      callbacks: {
        title: function (context) {
          return context[0].dataset.label || "";
        },
        label: function (context) {
          return `Nilai: ${context.raw}%`;
        },
        labelPointStyle: function () {
          return {
            pointStyle: "rectRounded",
            rotation: 0,
            borderRadius: 4
          };
        }
      }
    },
    legend: { 
      position: "bottom",
      labels: {
        font: { size: 14 },
        usePointStyle: true,
        pointStyle: "rectRounded",
        padding: 12
      },
      display: true 
    },
    verticalLineInBar: {
      show: props.showVerticalLine,
      color: "#DDDD",
      lineWidth: 1
    }
  },
  scales: {
    x: { 
      fontSize: 10,
      grid: { 
        display: false
      },
      ticks: {
        color: "#252528",
        drawTicks: true,
        tickLength: 5.5
      },
      title: {
        display: true,            
        text: "Kanwil",
        font: {
          size: 14,
        }
      }
    },
    y: {
      fontSize: 10,
      grid: {
        display: true,
        color: "#e0e0e0",
        lineWidth: 1,
        drawTicks: true,
        tickColor: "#777777",
        tickLength: 5
      },
      ticks: {
       color: "#333",
       padding: 8
      },
      grace: "10%",
      title: {
        display: true,      
        text: "Presentase",
        font: {
          size: 14,
        }
      }
    }
  }
};

// mergedOptions: override tooltip.enabled and tooltip.external when slot exists
const mergedOptions = computed(() => {
  const merged = {
    ...defaultOptions,
    ...props.options,
    plugins: {
      ...defaultOptions.plugins,
      ...((props.options && props.options.plugins) || {}),
      legend: {
        ...defaultOptions.plugins.legend,
        ...((props.options.plugins && props.options.plugins.legend) || {}),
        labels: {
          ...defaultOptions.plugins.legend.labels,
          ...((props.options.plugins?.legend?.labels) || {}),
        },
      },
      tooltip: {
        ...defaultOptions.plugins.tooltip,
        ...(props.options.plugins?.tooltip || {}),
      },
    },
  };

  merged.plugins.tooltip = {
    ...merged.plugins.tooltip,
    enabled: !hasTooltipSlot,
    external: hasTooltipSlot ? externalTooltip : merged.plugins.tooltip.external,
  };

  return merged;
});


// pilih plugin list: kalau ada slot, jangan aktifkan tooltipShadowPlugin (kebalikan)
const chartPlugins = computed(() => {
  if (hasTooltipSlot) {
    return [verticalLinePlugin];
  } else {
    return [verticalLinePlugin, tooltipShadowPlugin];
  }
});
</script>

<template>
  <div class="bar-chart h-full">
    <Bar
      :data="{ labels: props.labels, datasets: styledDatasets }"
      :options="mergedOptions"
      :plugins="chartPlugins"
    />
  </div>
</template>

<style>
.barchart-tooltip-slot {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  padding: 8px 12px;
  font-size: 13px;
  position: relative;
}

/* caret kanan (tooltip di kiri bar) */
.barchart-tooltip-slot.caret-right::after {
  content: "";
  position: absolute;
  top: 50%;
  left: -6px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid #fff;
  filter: drop-shadow(-2px 0 2px rgba(0,0,0,0.08));
}

/* caret kiri (tooltip di kanan bar) */
.barchart-tooltip-slot.caret-left::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -6px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid #fff;
  filter: drop-shadow(2px 0 2px rgba(0,0,0,0.08));
}

</style>