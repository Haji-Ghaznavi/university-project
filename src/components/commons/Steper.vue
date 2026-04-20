<template>
  <v-card
    class="mx-auto"
    height="650"
    width="1100"
  >
    <v-card-title class="text-title-large font-weight-regular justify-space-between">
      <span>{{ steperTitle }}</span>
      <v-btn
        @click="emit('onClose')"
        class="float-end mt-1"
        width="28"
        height="28"
        icon
        variant="text"
        color="black"
        ><v-icon size="28">mdi-close-circle-outline</v-icon></v-btn
      >
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text>
      <v-window
        v-model="step"
        style="height: 100% !important"
      >
        <v-window-item
          v-for="(step, i) in props.steps"
          :key="i"
          :value="i"
        >
          <component
            :is="step.component"
            :payload="step?.payload"
            :ref="el => (stepRefs[i] = el)"
          ></component>
        </v-window-item>
      </v-window>
    </v-card-text>
    <v-divider></v-divider>

    <v-card-actions class="pt-3">
      <v-btn
        v-if="step > 0 && step < props.steps?.length - 1"
        variant="text"
        @click="step--"
      >
        برگشت
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="step < props.steps?.length - 1"
        color="primary"
        variant="flat"
        @click="onNext"
        :loading="props.loading"
      >
        {{ step < props.steps?.length - 2 ? 'بعدی' : 'ثبت' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['onClose', 'onSubmit'])
const props = defineProps({
  steps: {
    type: Array,
    default: () => [],
  },

  onDone: {
    type: Boolean,
    default: false,
  },

  loading: {
    type: Boolean,
    default: false,
  },

  steperTitle: {
    type: String,
    default: '',
  },
})

const step = ref(0)
const stepRefs = ref([])

const onNext = async () => {
  const currentStep = stepRefs.value[step.value]
  if (currentStep?.validate) {
    const val = await currentStep.validate()
    if (!val) return
  }

  step.value < props.steps?.length - 2 ? step.value++ : emit('onSubmit')
}

watch(
  () => props.onDone,
  value => {
    if (value) {
      step.value++
    }
  },
)
</script>
