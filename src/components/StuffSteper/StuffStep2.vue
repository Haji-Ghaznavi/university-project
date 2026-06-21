<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.contract_start_date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-play"
          type="date"
          label="شروع قرارداد"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.contract_end_date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-stop"
          type="date"
          label="ختم قرارداد"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.salary"
          :rules="[requiredValidator]"
          prepend-icon="mdi-cash-check"
          label="معاش"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="payload.currency"
          :rules="[requiredValidator]"
          :items="currencies"
          item-title="name"
          item-value="id"
          prepend-icon="mdi-currency-usd"
          label="واحد پول "
        ></v-select>
      </v-col>
       <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.guarantee"
          :rules="[requiredValidator]"
          prepend-icon="mdi-document"
          label="ضمانت"
        ></v-text-field>
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
import { requiredValidator } from '@/plugins/vuelidate/vuelidate'
import { ref } from 'vue'
const props = defineProps({
  payload: {
    type: Object,
    default: () => ({}),
  },
})

const formRef = ref()
const currencies = ref([
  {
    id: 'دالر امریکایی',
    name: 'دالر امریکایی',
  },
  {
    id: 'دالر آسترالیایی',
    name: 'دالر آسترالیایی',
  },
  {
    id: 'افغانی',
    name: 'افغانی',
  },
  {
    id: 'یورو',
    name: 'یورو',
  },
])

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
