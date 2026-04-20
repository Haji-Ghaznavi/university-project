<template>
  <v-avatar
    :image="profile"
    :size="size"
  ></v-avatar>
</template>

<script setup>
import avatar from '@/assets/images/avatars/avatar-1.png'
import { computed } from 'vue'

const props = defineProps({
  imageUrl: {
    type: String,
    default: avatar,
  },

  size: {
    type: String,
    default: '50',
  },
})

const profile = computed(() => {
  if (props.imageUrl) {
    return import.meta.env.VITE_API_URL + "storage/" + props.imageUrl
  }

  return avatar
})
</script>
