<template>
  <v-dialog
    v-model="show"
    persistent
    width="420"
    transition="dialog-top-transition"
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>تغییر وضعیت وظیفه</span>
        <v-btn
          icon
          size="small"
          variant="text"
          @click="close"
        >
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text>
        <v-radio-group
          v-model="selectedStatus"
          hide-details
        >
          <v-radio
            v-for="option in statusOptions"
            :key="option.value"
            :label="option.title"
            :value="option.value"
            :color="option.color"
          />
        </v-radio-group>
      </v-card-text>
      <v-divider />

      <v-card-actions class="justify-end pa-3">
        <v-btn
          variant="text"
          @click="close"
        >
          انصراف
        </v-btn>
        <v-btn
          color="primary"
          variant="flat"
          :loading="loading"
          :disabled="!selectedStatus"
          @click="submit"
        >
          ثبت وضعیت
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import usePageConfig from '@/page-configs/daily_task'
import { axios } from '@/plugins/axios-plugin'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const { statusOptions } = usePageConfig()
const emit = defineEmits(['fetchRecord'])

const show = ref(false)
const loading = ref(false)
const selectedStatus = ref(null)
const recordId = ref(null)

const openDialog = record => {
  recordId.value = record.id
  selectedStatus.value = record.status ?? null
  show.value = true
}

const close = () => {
  show.value = false
  loading.value = false
  selectedStatus.value = null
  recordId.value = null
}

const submit = async () => {
  try {
    loading.value = true
    const res = await axios.post('credits-and-debets/change-status', {
      id: recordId.value,
      status: selectedStatus.value,
    })
    if (res.request.status === 200) {
      toast.success('وضعیت موفقانه تغییر کرد')
      emit('fetchRecord')
      close()
    }
  } catch (error) {
    console.log('error while changing the status', error)
  }
  loading.value = false
}

defineExpose({
  openDialog,
})
</script>
