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
      :steperTitle="steperTitle"
    ></Steper>
  </v-dialog>
</template>

<script setup>
import { axios } from '@/plugins/axios-plugin'
import { markRaw, ref } from 'vue'
import DoneStep from '../commons/DoneStep.vue'
import Steper from '../commons/Steper.vue'
import Step1 from './DailyExpenseSteper1.vue'

const emit = defineEmits('fetchRecord')
const firstStep = markRaw(Step1)
const doneStep = markRaw(DoneStep)

const steperTitle = ref('ایجاد مصارف')
const onDone = ref(false)
const loading = ref(false)
const defaultPayload = () => ({
  id: null,
  type: '',
  amount: null,
  currency: '',
  date: '',
  description: '',
})

const payload = ref(defaultPayload())

const steps = ref([
  {
    component: firstStep,
    payload,
  },
  {
    component: doneStep,
  },
])

const showDialog = ref(false)

const submit = async () => {
  try {
    loading.value = true
  
    if (payload.value.id) {
      await axios.post('', payload.value)
    } else {
      const res = await axios.post('users', payload.value)
      if (res.request.status === 200) {
        onDone.value = true
      }
    }
    emit('fetchRecord')
  } catch (error) {
    console.log('error while submiting the form', error)
  }
  loading.value = false
}

const openDialog = () => {
  showDialog.value = true
}

const openEditDialog = record => {
  showDialog.value = true
  steperTitle.value = 'ویرایش مصارف'
  payload.value.id = record.id
}

const closeDialog = () => {
  showDialog.value = false
  loading.value = false
  payload.value = defaultPayload()
  onDone.value = false
}

defineExpose({
  openDialog,
  openEditDialog,
})
</script>
