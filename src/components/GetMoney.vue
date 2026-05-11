<template>
  <v-dialog
    v-model="dialog"
    width="600"
    persistent
  >
    <v-card width="600">
      <v-card-title>برداشت نمودن پول از حساب بانکی</v-card-title>
      <v-card-text style="height: 300px">
        <v-text-field
          label="مقدار پول"
          v-model="amount"
          :rules="[requiredValidator]"
        ></v-text-field>
        <v-text-field
          label="تاریخ"
          v-model="date"
          :rules="[requiredValidator]"
          type="date"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="takeMoney"
          :loading="loading"
          >تایید</v-btn
        >
        <v-btn
          @click="closeDialog"
          color="error"
          >انصراف</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { axios } from '@/plugins/axios-plugin'
import { requiredValidator } from '@/plugins/vuelidate/vuelidate'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const emit = defineEmits(['onTake'])

const dialog = ref(false)
const amount = ref(null)
const date = ref(null)
const transaction_id = ref(null)
const loading = ref(false)

const showDialog = id => {
  dialog.value = true
  transaction_id.value = id
}

const closeDialog = () => {
  transaction_id.value = null
  amount.value = null
  date.value = null
  dialog.value = false
}
const takeMoney = async () => {
  try {
    loading.value = true
    const res = await axios.post('bank-accounts/transactions', {
      id: transaction_id.value,
      amount: amount.value,
      type: 'take',
      date: date.value,
    })
    if (res.request.status === 200) {
      toast.success('برداشت شد')
      emit('onTake')
      closeDialog()
    }
  } catch (error) {
    console.log('error while submitting the form', error)
  }
  loading.value = false
}

defineExpose({
  showDialog,
})
</script>
