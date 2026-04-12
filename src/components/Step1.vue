<template>
  <h1>step 1</h1>
  <!-- <v-text-field v-model="payload.name"></v-text-field> -->
</template>

<script setup>
const props = defineProps({
  payload: {
    type: Object,
    default: () => ({}),
  },
})
</script>
