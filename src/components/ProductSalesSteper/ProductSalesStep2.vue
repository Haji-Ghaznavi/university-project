<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.date"
          prepend-icon="mdi-calendar"
          :rules="[requiredValidator]"
          type="date"
          label="تاریخ"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.shop_name"
          prepend-icon="mdi-calendar"
          :rules="[requiredValidator]"
          type="date"
          label="نام دکان"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.paid_amount"
          prepend-icon="mdi-calendar"
          :rules="[requiredValidator]"
          type="date"
          label="مقدار پرداخت شده"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.remaining_amount"
          prepend-icon="mdi-calendar"
          :rules="[requiredValidator]"
          type="date"
          label="مقدار باقی مانده"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-textarea
          v-model="payload.description"
          prepend-icon="mdi-account-outline"
          label="توضیحات"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { requiredValidator } from '@/plugins/vuelidate/vuelidate'
import { ref } from 'vue'
const props = defineProps({
  payload: {
    type: Object,
    default: () => ({}),
  },
})

const formRef = ref()
const validate = async () => {
  const val = await formRef.value.validate()
  if (val.valid) {
    return true
  } else {
    return false
  }
}

const onLoad = () => {}

defineExpose({
  validate,
  onLoad,
})
</script>
