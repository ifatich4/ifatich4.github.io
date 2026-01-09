<template>
  <div class="chart-wrapper">
    <Line :data="chartData" :options="mergedOptions" :plugins="[dotsPlugin, !hasTooltipSlot && tooltipShadowPlugin, autoGradientPlugin, verticalLinePlugin]"/>
  </div>
</template>

<script setup>
import { defineProps, computed, useSlots, ref, onUnmounted, h, render } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
)


const props = defineProps({
  labels: {
    type: Array,
    default: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
  datasets: {
    type: Array,
    default: () => [
        {
          label: 'Contoh Penjualan',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: '#fc8403',
        },
         {
          label: 'Contoh Pembelian',
          data: [45, 29, 40, 50, 36, 35, 50],
        }
      ]
  },
  options: { type: Object },
})

const slots = useSlots()
const hasTooltipSlot = !!slots.tooltip
const tooltipElRef = ref(null)

function createTooltipElIfNeeded(chart) {
  if (tooltipElRef.value) return tooltipElRef.value;
  const el = document.createElement("div");
  el.className = "linechart-tooltip-slot";
  el.style.cssText = `
    position: absolute;
    pointer-events: none;
    z-index: 99;
    opacity: 0;
    transition: opacity 0.3s ease, left 0.2s ease, top 0.2s ease;
    will-change: left, top, opacity;
  `;
  chart.canvas.parentNode.style.position = "relative"; // pastikan parent punya posisi relatif
  chart.canvas.parentNode.appendChild(el);
  tooltipElRef.value = el;
  return el;
}


onUnmounted(() => {
  if (tooltipElRef.value) {
    try { render(null, tooltipElRef.value) } catch { /* empty */ }
    tooltipElRef.value.remove()
    tooltipElRef.value = null
  }
})

function externalTooltipHandler(context) {
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

  // Render slot custom
  render(h("div", {}, slots.tooltip(slotProps)), tooltipEl);

  // --- Hitung posisi relatif ke container chart ---
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

const defaultColors = [
  '#42b883',
  '#36a2eb',
  '#ff6384',
  '#ffcd56',
  '#4bc0c0',
  '#9966ff'
]

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map((ds, i) => {
    const color = ds.backgroundColor || defaultColors[i % defaultColors.length]
    return {
      label: ds.label || `Label ${i + 1}`,
      data: ds.data,
      borderColor: color,
      backgroundColor: color,
      fill: props.datasets.length === 1 && true,
      ...ds
    }
  })
}))

const autoGradientPlugin = {
  id: 'autoGradientPlugin',
  beforeDatasetsUpdate(chart) {
    const { ctx, chartArea, data } = chart
    if (!chartArea) return

    data.datasets.forEach((dataset) => {
      if (!dataset.fill) return

      const color = dataset.borderColor || '#36a2eb'
      const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)

      gradient.addColorStop(0, hexToRgba(color, 0.4))
      gradient.addColorStop(1, hexToRgba(color, 0))

      dataset.backgroundColor = gradient
    })
  }
}


function hexToRgba(hex, alpha = 1) {
  let r = 0, g = 0, b = 0
  hex = hex.replace('#', '')
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
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

const dotsPlugin = {
  id: 'dotsPlugin',
  beforeDatasetsDraw(chart) {
    const { ctx, chartArea, scales } = chart
    if (!scales || !scales.x) return

    const xAxis = scales.x

    ctx.save()
    ctx.fillStyle = '#BBBDC0'
    const radius = 3
    const ticks = xAxis.ticks || []
    ticks.forEach((t) => {
      const tickValue = (typeof t === 'object' && t !== null && t.value !== undefined) ? t.value : t
      let x
      try {
        x = xAxis.getPixelForValue(tickValue)
      } catch (e) {
        const idx = chart.data.labels ? chart.data.labels.indexOf(tickValue) : -1
        x = idx >= 0 ? xAxis.getPixelForValue(idx) : null
      }
      if (x === null || x === undefined) return

      const y = chartArea.bottom

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    })

    ctx.restore()
  } 
}

const verticalLinePlugin = {
  id: 'verticalLinePlugin',
  afterDraw(chart) {
    const tooltip = chart.tooltip
    if (tooltip?._active && tooltip.opacity && tooltip.dataPoints?.length) {
      const { ctx, chartArea } = chart
      const activePoint = tooltip.dataPoints[0]
      const x = activePoint.element.x
      const y = activePoint.element.y
      const dataset = chart.data.datasets[activePoint.datasetIndex]
      const lineColor = dataset.borderColor || '#BBBDC0'

      ctx.save()
      ctx.beginPath()
      ctx.setLineDash([4, 4])
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 1
      ctx.moveTo(x, y)
      ctx.lineTo(x, chartArea.bottom)
      ctx.stroke()
      ctx.restore()
    }
  }
}

function isPlainObject(v) {
  return Object.prototype.toString.call(v) === '[object Object]'
}

function deepMerge(target, source) {
  if (!isPlainObject(source)) return source
  const out = isPlainObject(target) ? { ...target } : {}
  for (const key of Object.keys(source)) {
    const srcVal = source[key]
    const tgtVal = out[key]
    if (isPlainObject(srcVal) && isPlainObject(tgtVal)) {
      out[key] = deepMerge(tgtVal, srcVal)
    } else {
      out[key] = srcVal
    }
  }
  return out
}

const mergedOptions = computed(() => {
     const merged = deepMerge(defaultOptions, props.options || {})

     merged.plugins.tooltip.enabled = !hasTooltipSlot
merged.plugins.tooltip.external = hasTooltipSlot ? externalTooltipHandler : merged.plugins.tooltip.external

    return merged
})


const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: { size: 12 },
        usePointStyle: true,
        padding: 32,
        generateLabels(chart) {
          const datasets = chart.data.datasets
          return datasets.map((ds, i) => ({
            text: ds.label,
            fillStyle: ds.legendColor || ds.borderColor, 
            strokeStyle: ds.borderColor,
            pointStyle: ds.pointStyle || 'rectRounded',
            hidden: !chart.isDatasetVisible(i),
            datasetIndex: i,
          }))
        },
      },
    },
    tooltip: {
  enabled: !hasTooltipSlot,
  external: hasTooltipSlot ? externalTooltipHandler : undefined,
  caretPadding: 24,
  backgroundColor: '#fff',
  titleColor: '#252528',
  bodyColor: '#252528',
  cornerRadius: 12,
  padding: 16,
  usePointStyle: true,
  callbacks: {
    title: () => '',
    labelPointStyle: () => ({ pointStyle: 'rectRounded', rotation: 0, borderRadius: 4 }),
    labelColor(context) {
      const dataset = context.dataset
      return {
        borderColor: dataset.borderColor,
        backgroundColor: dataset.borderColor,
      }
    },
  },
},

    title: { display: false },
  },
  scales: {
    y: { 
      grid :{
        display: true,
        drawBorder: false,
        color: '#EEEEEF',
      },
       border: {
        display: false, // hilangkan garis sumbu Y di kiri
        dash: [6, 6],
        dashOffset: 6
      },
      ticks: {
          font: {
              size: 10,
          },
          color: '#939597'
      }
    },
    x: { 
      offset: true,
      grid: { 
        display: false,
      },
       border: {
          display: false, // hilangkan garis sumbu Y di kiri
      },
      ticks: {
          font: {
              size: 10,
              weight: 'bold',
          },
          color: '#58585B'
      }
}
  },
  pointRadius: 1,
  pointHoverRadius: 5,
  hoverBackgroundColor: ctx => {
    return ctx.dataset.borderColor
  },
  hoverBorderColor: ctx => {
    return ctx.dataset.borderColor
  }
}
</script>

<style>
.linechart-tooltip-slot {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  padding: 8px 12px;
  font-size: 13px;
  position: relative;
}

/* caret kanan (tooltip di kiri bar) */
.linechart-tooltip-slot.caret-right::after {
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
.linechart-tooltip-slot.caret-left::after {
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
