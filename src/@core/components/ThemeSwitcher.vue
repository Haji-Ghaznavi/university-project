<script setup>
import { computedWithControl, useCycleList } from '@vueuse/core'
import { watch } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  themes: {
    type: Array,
    required: true,
  },
})

const vuetifyTheme = useTheme()

// ✅ Load saved theme safely
const savedTheme = localStorage.getItem('theme')

if (savedTheme && props.themes.some(t => t.name === savedTheme)) {
  vuetifyTheme.global.name.value = savedTheme
} else {
  // fallback to first theme if invalid
  vuetifyTheme.global.name.value = props.themes[0]?.name
}

// ✅ Cycle through themes safely
const {
  state: currentTheme,
  next: getNextThemeName,
  index: currentThemeIndex,
} = useCycleList(
  props.themes.map(t => t.name),
  {
    initialValue:
      vuetifyTheme.global.name.value || props.themes[0]?.name,
  },
)

// ✅ Change theme
const changeTheme = () => {
  const nextTheme = getNextThemeName()
  vuetifyTheme.global.name.value = nextTheme
  localStorage.setItem('theme', nextTheme)
}

// ✅ Compute next icon safely
const getThemeIcon = computedWithControl(
  vuetifyTheme.global.name,
  () => {
    if (!props.themes.length) return ''

    const nextThemeIndex =
      currentThemeIndex.value + 1 === props.themes.length
        ? 0
        : currentThemeIndex.value + 1

    return props.themes[nextThemeIndex]?.icon || ''
  },
)

// ✅ Sync state
watch(vuetifyTheme.global.name, val => {
  currentTheme.value = val
})
</script>

<template>
  <VBtn
    class="me-2"
    icon
    variant="text"
    color="default"
    size="small"
    @click="changeTheme"
  >
    <VIcon
      :icon="getThemeIcon"
      size="24"
    />
  </VBtn>
</template>