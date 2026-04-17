<template>
  <v-dialog
    v-model="showDialog"
    persistent
    transition="dialog-top-transition"
  >
    <Steper
      :steps="steps"
      @onClose="closeDialog"
      @onSubmit="submit"
      :onDone="onDone"
      :loading="loading"
    ></Steper>
  </v-dialog>
</template>

<script setup>
import { markRaw, ref } from 'vue'
import DoneStep from '../commons/DoneStep.vue'
import Steper from '../commons/Steper.vue'
import Step1 from './UserStep1.vue'
import Step2 from './UserStep2.vue'

const firstStep = markRaw(Step1)
const secondStep = markRaw(Step2)
const doneStep = markRaw(DoneStep)

const onDone = ref(false)
const loading = ref(false)
const defaultPayload = () => ({
  name: '',
  last_name: '',
})

const payload =ref(defaultPayload());

const steps = ref([
  {
    title: 'ایجاد حساب',
    component: firstStep,
    payload,
  },
  {
    title: 'تنظیمات',
    component: secondStep,
    payload,
  },
  {
    title: 'پایان',
    component: doneStep,
  },
])

const showDialog = ref(false)

const submit = () => {
  try {
    loading.value = true
    onDone.value = true
    console.log('form submited')
  } catch (error) {
    console.log('error while submiting the form', error)
  }
  loading.value = false
}

const openDialog = () => {
  showDialog.value = true
}

const closeDialog = () => {
  showDialog.value = false;
  loading.value  = false;
  payload.value = defaultPayload();
  onDone.value = false;
}

defineExpose({
  openDialog,
})
</script>
