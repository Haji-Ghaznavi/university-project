<template>
  <v-card
    class="mx-auto"
    height="600"
    width="800"
  >
    <v-card-title class="text-title-large font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-btn
        @click="emit('onClose')"
        class="float-end mt-1"
        width="25"
        height="25"
        icon
        variant="text"
        ><v-icon>mdi-close-circle-outline</v-icon></v-btn
      >
    </v-card-title>
    <v-divider></v-divider>

    <v-window
      v-model="step"
      style="height: 100% !important"
    >
      <v-window-item
        v-for="(step, i) in props.steps"
        :key="i"
        :value="i"
      >
        <v-card-text>
            <component :is="step.component" :payload="step?.payload"></component>
        </v-card-text>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions class="pt-3">
      <v-btn
        v-if="step > 0"
        variant="text"
        @click="step--"
      >
        برگشت
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="step < props.steps?.length -1"
        color="primary"
        variant="flat"
        @click="step++"
      >
        {{ step < props.steps?.length - 2 ? 'بعدی' : 'ثبت' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['onClose'])
const props = defineProps({
  steps: {
    type: Array,
    default: () => [],
  },
})

const step = ref(0)

const currentTitle = computed(() => {
  return props.steps[step.value]?.title
})
</script>
