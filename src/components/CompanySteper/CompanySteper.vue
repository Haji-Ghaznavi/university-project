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
import Step1 from './CompanyStep1.vue'
import Step2 from './CompanyStep2.vue'


const emit = defineEmits('fetchRecord')
const firstStep = markRaw(Step1)
const secondStep = markRaw(Step2)
const doneStep = markRaw(DoneStep)

const steperTitle = ref('ایجاد شرکت')
const onDone = ref(false)
const loading = ref(false)
const defaultPayload = () => ({
  id: null,
  name: '',
  head_name: '',
  head_last_name: '',
  head_phone_number: '',
  assistant_name: '',
  assistant_last_name: '',
  assistant_phone_number: '',
  permission_produced_date: '',
  permission_expired_date: '',
  permission_produced_place: '',
  permission_produced_company: '',
  description: '',
  paid_amount:null
})

const payload = ref(defaultPayload())

const steps = ref([
  {
    component: firstStep,
    payload,
  },
  {
    component: secondStep,
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
      const res = await axios.put('companies/' + payload.value.id, payload.value)
      if (res.request.status === 200) {
        onDone.value = true
      }
    } else {
      const res = await axios.post('companies', payload.value)
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
  steperTitle.value = 'ویرایش شرکت'
  payload.value.id = record.id
  payload.value.name = record.name
  payload.value.head_name = record.head_name
  payload.value.head_last_name = record.head_last_name
  payload.value.head_phone_number = record.head_phone_number
  payload.value.assistant_name = record.assistant_name
  payload.value.assistant_last_name = record.assistant_last_name
  payload.value.assistant_phone_number = record.assistant_phone_number
  payload.value.permission_produced_date = record.permission_produced_date
  payload.value.permission_expired_date = record.permission_expired_date
  payload.value.permission_produced_place = record.permission_produced_place
  payload.value.permission_produced_company = record.permission_produced_company
  payload.value.description = record.description
  payload.value.paid_amount = record.paid_amount
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
