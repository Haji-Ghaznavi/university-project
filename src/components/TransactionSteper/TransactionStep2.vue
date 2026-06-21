<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="payload.transaction_type"
          :rules="[requiredValidator]"
          :items="transactionTypes"
          item-title="title"
          item-value="value"
          prepend-icon="mdi-swap-horizontal"
          label="نوع داد و گرفت"
        ></v-select>
      </v-col>
        <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="payload.payment_reason"
          :rules="[requiredValidator]"
          :items="['امانت', 'قرض', 'فروش', 'مصرف', 'دیگر']"
          item-title="title"
          item-value="value"
          prepend-icon="mdi-swap-horizontal"
          label="بابت"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.amount"
          type="number"
          :rules="[requiredValidator]"
          prepend-icon="mdi-cash"
          label="مقدار"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="payload.currency"
          :items="currencies"
          :rules="[requiredValidator]"
          item-title="title"
          item-value="value"
          prepend-icon="mdi-currency-usd"
          label="واحد پول"
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="payload.description"
          prepend-icon="mdi-text"
          label="توضیحات"
          rows="2"
          auto-grow
        ></v-textarea>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import usePageConfig from '@/page-configs/transaction'
import { requiredValidator } from '@/plugins/vuelidate/vuelidate'
import { ref } from 'vue'

const { currencies, transactionTypes } = usePageConfig()
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
