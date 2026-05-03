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
import Step1 from './StuffStep1.vue'
import Step2 from './StuffStep2.vue'

const emit = defineEmits('fetchRecord')
const firstStep = markRaw(Step1)
const secondStep = markRaw(Step2)
const doneStep = markRaw(DoneStep)

const steperTitle = ref('ایجاد کارمند')
const onDone = ref(false)
const loading = ref(false)

/// fill the default payload as the table colums
const defaultPayload = () => ({
  id: null,
  name: '',
  father_name: '',
  last_name: '',
  phone_number: '',
  identity_card_number: '',
  full_address: '',
  contract_type: '',
  contract_start_date: '',
  contract_end_date: '',
  salary: null,
  currency: '',
  profile: '',
  responsiblity: '',
  guarantee: '',
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
    const formData = new FormData()
    formData.append('name', payload.value.name)
    formData.append('father_name', payload.value.father_name)
    formData.append('last_name', payload.value.last_name)
    formData.append('phone_number', payload.value.phone_number)
    formData.append('contract_type', payload.value.contract_type)
    formData.append('contract_start_date', payload.value.contract_start_date)
    formData.append('contract_end_date', payload.value.contract_end_date)
    formData.append('salary', payload.value.salary)
    formData.append('currency', payload.value.currency)
    formData.append('profile', payload.value.profile)
    formData.append('responsiblity', payload.value.responsiblity)
    formData.append('identity_card_number', payload.value.identity_card_number)
    formData.append('full_address', payload.value.full_address)
    formData.append('guarantee', payload.value.guarantee)
    if (payload.value.id) {
     const res =  await axios.post(`stuffs/${payload.value.id}?_method=PUT`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (res.request.status === 200) {
        onDone.value = true
      }
    } else {
      const res = await axios.post('stuffs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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
  steperTitle.value = 'ویرایش کارمند'
  payload.value.id = record.id
  payload.value.name = record.name
  payload.value.father_name = record.father_name
  payload.value.last_name = record.last_name
  payload.value.phone_number = record.phone_number
  payload.value.contract_type = record.contract_type
  payload.value.contract_start_date = record.contract_start_date
  payload.value.contract_end_date = record.contract_end_date
  payload.value.salary = record.salary
  payload.value.currency = record.currency
  payload.value.profile = record.profile
  payload.value.responsiblity = record.responsiblity
  payload.value.identity_card_number = record.identity_card_number
  payload.value.full_address = record.full_address
  payload.value.guarantee = record.guarantee
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
