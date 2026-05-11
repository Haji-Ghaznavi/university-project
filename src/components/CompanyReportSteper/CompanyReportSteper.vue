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
import Step1 from './CompanyReportStep1.vue'

const emit = defineEmits('fetchRecord')
const firstStep = markRaw(Step1)
const doneStep = markRaw(DoneStep)

const steperTitle = ref('ایجاد گزارش شرکت')
const onDone = ref(false)
const loading = ref(false)
const defaultPayload = () => ({
  id: null,
  company_id: '',
  report_type: '',
  activity_type: '',
  amount: '',
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
      const res = await axios.put('company-reports/' + payload.value.id, payload.value)
      if (res.request.status === 200) {
        onDone.value = true
      }
    } else {
      const res = await axios.post('company-reports', payload.value)
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
  steperTitle.value = 'ویرایش گزارش شرکت'
  payload.value.id = record.id
  payload.value.company_id = record.company_id
  payload.value.report_type = record.report_type
  payload.value.activity_type = record.activity_type
  payload.value.amount = record.amount
  payload.value.date = record.date
  payload.value.description = record.description
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
