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
import Step1 from './VisaRegistrationStep1.vue'
import Step2 from './VisaRegistrationStep2.vue'

const emit = defineEmits('fetchRecord')
const firstStep = markRaw(Step1)
const secondStep = markRaw(Step2)
const doneStep = markRaw(DoneStep)

const steperTitle = ref('ثبت ویزا')
const onDone = ref(false)
const loading = ref(false)

/// fill the default payload as the table colums
const defaultPayload = () => ({
  id: null,
  name: '',
  last_name: '',
  passport_number: '',
  phone_number: '',
  city: '',
  afg_full_address: '',
  abroad_full_address: '',
  currency: '',
  visa_price: null,
  airplane_ticket_price: null,
  paid_amount: null,
  visa_type: '',
  travel_mode: '',
  visa_period: '',
  introducer: '',
  introducer_phone_number: '',
  visa_taken_date: '',
  description: '',
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
      const res = await axios.put('visa-registrations/' + payload.value.id, payload.value)
      if (res.request.status === 200) {
        onDone.value = true
      }
    } else {
      const res = await axios.post('visa-registrations', payload.value)
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
  steperTitle.value = 'ویرایش ویزا'
  payload.value.id = record.id
  payload.value.name = record.name
  payload.value.last_name = record.last_name
  payload.value.passport_number = record.passport_number
  payload.value.phone_number = record.phone_number
  payload.value.city = record.city
  payload.value.afg_full_address = record.afg_full_address
  payload.value.abroad_full_address = record.abroad_full_address
  payload.value.currency = record.currency
  payload.value.visa_price = record.visa_price
  payload.value.airplane_ticket_price = record.airplane_ticket_price
  payload.value.paid_amount = record.paid_amount
  payload.value.visa_type = record.visa_type
  payload.value.travel_mode = record.travel_mode
  payload.value.visa_period = record.visa_period
  payload.value.introducer = record.introducer
  payload.value.introducer_phone_number = record.introducer_phone_number
  payload.value.visa_taken_date = record.visa_taken_date
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
