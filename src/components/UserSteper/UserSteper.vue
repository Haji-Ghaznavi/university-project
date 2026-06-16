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
import Step1 from './UserStep1.vue'

const emit = defineEmits('fetchRecord')
const firstStep = markRaw(Step1)
const doneStep = markRaw(DoneStep)

const steperTitle = ref('ایجاد کاربر')
const onDone = ref(false)
const loading = ref(false)
const defaultPayload = () => ({
  id: null,
  name: '',
  last_name: '',
  profile: null,
  password: '',
  role: '',
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
    const formData = new FormData()
    formData.append('name', payload.value.name)
    formData.append('last_name', payload.value.last_name)
    formData.append('profile', payload.value.profile)
    formData.append('role', payload.value.role)
    formData.append('password', payload.value.password)
    formData.append('description', payload.value.description)
    if (payload.value.id) {
      const res = await axios.post(`users/${payload.value.id}?_method=PUT`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (res.request.status === 200) {
        onDone.value = true
      }
    } else {
      const res = await axios.post('users', formData, {
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
  steperTitle.value = 'ویرایش کاربر'
  payload.value.id = record.id
  payload.value.name = record.name
  payload.value.last_name = record.last_name
  payload.value.role = record.role
  payload.value.profile = record.profile
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
