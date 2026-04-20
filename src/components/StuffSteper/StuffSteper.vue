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
const secondStep = markRaw(Step2);
const doneStep = markRaw(DoneStep)

const steperTitle = ref('ایجاد کارمند')
const onDone = ref(false)
const loading = ref(false)

/// fill the default payload as the table colums
const defaultPayload = () => ({
  id: null,
  name: '',
  last_name: '',
  profile: null,
  password: '',
  role: '',
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
    formData.append('last_name', payload.value.last_name)
    formData.append('profile', payload.value.profile)
    formData.append('role', payload.value.role)
    formData.append('password', payload.value.password)
    if (payload.value.id) {
      await axios.post('', formData)
    } else {
      const res = await axios.post('users', formData)
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
