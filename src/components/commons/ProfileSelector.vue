<template>
  <div
    class="image-container"
    @click="triggerFileInput"
  >
    <v-img
      class="img"
      :src="imageSource"
      :style="{
        width: props.width,
        height: props.height,
        maxWidth: props.width,
      }"
      cover
    >
    </v-img>
    <v-icon
      class="edit-icon"
      color="black"
      >mdi-square-edit-outline</v-icon
    >
  </div>

  <v-file-input
    ref="fileInputRef"
    v-show="false"
    @change="onFileChange"
    :multiple="false"
  ></v-file-input>
</template>

<script setup>
import avatar from '@/assets/images/avatars/avatar-1.png'
import { computed, ref } from 'vue'
const emit = defineEmits(['onUpload'])
const props = defineProps({
  profile: {
    type: String,
    default: null,
  },
  width: {
    type: String,
    default: '120px',
  },
  height: {
    type: String,
    default: '120px',
  },
})

const localFile = ref(null)

const imageSource = computed(() => {
  if (localFile.value) {
    return URL.createObjectURL(localFile.value)
  }

  if (props.profile) {
    return props.profile
  }

  return avatar
})

const fileInputRef = ref()
const triggerFileInput = () => {
  fileInputRef.value.click()
}
const onFileChange = e => {
  const file = e.target.files[0];
  localFile.value = file
  emit('onUpload', localFile.value);
}
</script>

<style>
.image-container {
  position: relative;
  overflow: visible;
  cursor: pointer;
}
.img {
  border-radius: 12px !important;
}

.edit-icon {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
