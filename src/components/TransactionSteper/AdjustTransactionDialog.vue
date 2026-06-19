<template>
  <v-dialog
    v-model="show"
    persistent
    width="420"
    transition="dialog-top-transition"
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>اصلاح معامله</span>
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
        <v-form ref="formRef">
          <v-radio-group
            v-model="selectedType"
            label="نوع داد و گرفت"
            :rules="[requiredValidator]"
          >
            <v-radio
              v-for="option in transactionTypes"
              :key="option.value"
              :label="option.title"
              :value="option.value"
              :color="option.color"
            />
          </v-radio-group>

          <v-text-field
            v-model="amount"
            type="number"
            prepend-icon="mdi-cash"
            label="مقدار"
            :rules="[requiredValidator]"
          ></v-text-field>
        </v-form>
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
          @click="submit"
        >
          ثبت اصلاح
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import usePageConfig from '@/page-configs/transaction'
import { requiredValidator } from '@/plugins/vuelidate/vuelidate'
import { axios } from '@/plugins/axios-plugin'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const { transactionTypes } = usePageConfig()
const emit = defineEmits(['fetchRecord'])

const show = ref(false)
const loading = ref(false)
const formRef = ref()
const selectedType = ref(null)
const amount = ref(null)
const recordId = ref(null)

const openDialog = record => {
  recordId.value = record.id
  selectedType.value = record.transaction_type ?? null
  amount.value = null
  show.value = true
}

const close = () => {
  show.value = false
  loading.value = false
  selectedType.value = null
  amount.value = null
  recordId.value = null
}

const submit = async () => {
  const val = await formRef.value.validate()
  if (!val.valid) return

  try {
    loading.value = true
    const res = await axios.post('credits-and-debets/adjust', {
      id: recordId.value,
      transaction_type: selectedType.value,
      amount: amount.value,
    })
    if (res.request.status === 200) {
      toast.success('معامله موفقانه اصلاح شد')
      emit('fetchRecord')
      close()
    }
  } catch (error) {
    console.log('error while adjusting the transaction', error)
  }
  loading.value = false
}

defineExpose({
  openDialog,
})
</script>
