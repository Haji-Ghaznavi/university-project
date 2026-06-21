<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.bill_number"
          prepend-icon="mdi-calendar"
          :rules="[requiredValidator]"
          label="نمبر بیل"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.buyer_name"
          prepend-icon="mdi-calendar"
          :rules="[requiredValidator]"
          label=" نام خریدار"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.sealer_name"
          prepend-icon="mdi-calendar"
          :rules="[requiredValidator]"
          label="  نام فروشنده"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.sealer_phone_number"
          prepend-icon="mdi-calendar"
          :rules="[requiredValidator]"
          label="  شماره تماس فروشنده"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.company_name"
          prepend-icon="mdi-account-outline"
          label="نام شرکت"
        ></v-text-field>
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
