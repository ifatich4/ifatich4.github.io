<template>
  <div :class="[`stack-chart-wrapper w-full`, props.class]">
    <Bar :data="chartData" :options="chartOptions" :plugins="chartPlugins" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import {
  computed,
  defineProps,
  onUnmounted,
  h,
  render,
  useSlots,
  ref,
} from 'vue'

// register
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

// global defaults
ChartJS.defaults.font.family = getComputedStyle(document.body).fontFamily
ChartJS.defaults.font.weight = 'normal'
ChartJS.defaults.font.size = 12
ChartJS.defaults.color = '#252528'

// props (note: props.options untuk override)
const props = defineProps({
  labels: { type: Array, required: true },
  datasets: { type: Array, required: true },
  options: { type: Object, default: () => ({}) },
  showLegend: { type: Boolean, default: true },
  class: { type: String, default: '' },
})

// tooltip slot detection
const slots = useSlots()
const hasTooltipSlot = !!slots.tooltip
const tooltipElRef = ref(null)

// create tooltip DOM (for external slot)
function createTooltipElIfNeeded(chart) {
  if (tooltipElRef.value) return tooltipElRef.value
  const el = document.createElement('div')
  el.className = 'stack-bar-chart-tooltip-slot'
  Object.assign(el.style, {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: '10',
    opacity: '0',
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
    padding: '8px 12px',
    transition: 'opacity 0.3s ease, left 0.2s ease, top 0.2s ease',
    willChange: 'left, top, opacity',
  })
  chart.canvas.parentNode.style.position = 'relative'
  chart.canvas.parentNode.appendChild(el)
  tooltipElRef.value = el
  return el
}


onUnmounted(() => {
  if (tooltipElRef.value) {
    try { render(null, tooltipElRef.value) } catch (e) { /* empty */ }
    tooltipElRef.value.remove()
    tooltipElRef.value = null
  }
})

// external tooltip handler (slot)
function externalTooltipHandler(context) {
  if (!hasTooltipSlot) return
  const { chart, tooltip } = context
  const tooltipEl = createTooltipElIfNeeded(chart)

  if (!tooltip || tooltip.opacity === 0) {
    tooltipEl.style.opacity = '0'
    return
  }

  const dataPoint = tooltip.dataPoints?.[0]
  if (!dataPoint) {
    tooltipEl.style.opacity = '0'
    return
  }

  const dataset = chart.data.datasets[dataPoint.datasetIndex]
  const slotProps = {
    datasetLabel: dataset?.label,
    label: dataPoint.label,
    value: dataPoint.formattedValue,
    raw: dataPoint.raw,
    dataIndex: dataPoint.dataIndex,
    datasetIndex: dataPoint.datasetIndex,
    tooltip,
  }

  render(h('div', {}, slots.tooltip(slotProps)), tooltipEl)

  requestAnimationFrame(() => {
    const canvasRect = chart.canvas.getBoundingClientRect()
    const parentRect = chart.canvas.parentNode.getBoundingClientRect()

    const tooltipW = tooltipEl.offsetWidth
    const tooltipH = tooltipEl.offsetHeight

    // posisi relatif terhadap parent container
    let left = tooltip.caretX - (canvasRect.left - parentRect.left)  + 40
    let top = tooltip.caretY - (canvasRect.top - parentRect.top) -35

    // sesuaikan seperti posisi Chart.js
    if (tooltip.yAlign === 'bottom') top -= tooltipH + 8
    if (tooltip.xAlign === 'center') left -= tooltipW / 2
    if (tooltip.xAlign === 'right') left -= tooltipW

    tooltipEl.style.left = `${Math.round(left)}px`
    tooltipEl.style.top = `${Math.round(top)}px`
    tooltipEl.style.opacity = '1'
  })
}


// Data / chart payload
const defaultColors = [
  '#42b883', '#36a2eb', '#ff6384', '#ffcd56', '#4bc0c0', '#9966ff'
]

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map((ds, i) => ({
    label: ds.label || `Label ${i + 1}`,
    backgroundColor: ds.backgroundColor || defaultColors[i % defaultColors.length],
    borderWidth: ds.borderWidth ?? 0,
    ...ds,
  })),
}))

// tooltip shadow plugin (for built-in tooltip drawing)
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
  ctx.fill()
}

const tooltipShadowPlugin = {
  id: 'tooltipShadow',
  beforeDraw(chart) {
    const tooltip = chart.tooltip
    if (tooltip?._active && tooltip.opacity) {
      const ctx = chart.ctx
      ctx.save()
      ctx.shadowColor = 'rgba(0,0,0,0.22)'
      ctx.shadowBlur = 8
      ctx.shadowOffsetY = 2
      ctx.fillStyle = tooltip.options.backgroundColor || '#fff'
      const { x, y, width, height } = tooltip
      drawRoundedRect(ctx, x, y, width, height, tooltip.options.cornerRadius || 12)
      ctx.restore()
    }
  },
}

// chartPlugins: keep internal plugin unless slot provided
const chartPlugins = computed(() => (hasTooltipSlot ? [] : [tooltipShadowPlugin]))

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

// --- INTERNAL default chart options (your existing config) ---
const internalOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
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
        labelPointStyle: () => ({ pointStyle: 'rectRounded', rotation: 0, borderRadius: 4 })
      },
    },
    legend: {
      position: 'bottom',
      display: props.showLegend,
      labels: {
        font: { size: 14 },
        usePointStyle: true,
        pointStyle: 'rectRounded',
        padding: 12
      }
    },
  },
  elements: {
    bar: {
      borderSkipped: false,
      borderRadius(ctx) {
        const { chart, dataIndex, datasetIndex } = ctx
        const r = 10
        const ds = chart?.data?.datasets || []
        const values = ds.map((d, i) =>
          !chart.isDatasetVisible(i) ? 0 : +d.data?.[dataIndex] || 0
        )
        const nonZero = values.map((v, i) => (v ? i : -1)).filter(i => i !== -1)
        if (!nonZero.length) return 0
        const [first, last] = [nonZero[0], nonZero.at(-1)]
        return datasetIndex === first && datasetIndex === last
          ? { topLeft: r, topRight: r, bottomLeft: r, bottomRight: r }
          : datasetIndex === first
          ? { topLeft: r, bottomLeft: r }
          : datasetIndex === last
          ? { topRight: r, bottomRight: r }
          : 0
      }
    }
  },
  scales: {
    x: { stacked: true, display: false },
    y: { stacked: true, display: false },
  }
}

// --- Final chartOptions: deep merge internalOptions dengan props.options (props menang di level field tertentu) ---
const chartOptions = computed(() => {
  // merge internal + external safely (props.options mungkin mengandung fungsi)
  const merged = deepMerge(internalOptions, props.options || {})

  // pastikan tooltip.enabled/external mengikuti slot (slot harus memaksa external behavior)
  merged.plugins = merged.plugins || {}
  merged.plugins.tooltip = merged.plugins.tooltip || {}
  merged.plugins.tooltip.enabled = !hasTooltipSlot
  merged.plugins.tooltip.external = hasTooltipSlot ? externalTooltipHandler : merged.plugins.tooltip.external

  return merged
})

</script>

<style>
.stack-bar-chart-tooltip-slot {
  position: absolute;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  padding: 8px 12px;
  font-size: 13px;
  pointer-events: none;
  transform: translate(-50%, 0);
  transition: opacity 0.3s ease, left 0.15s ease, top 0.15s ease;
  will-change: left, top, opacity;
}

.stack-bar-chart-tooltip-slot::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid #fff;
}
</style>
