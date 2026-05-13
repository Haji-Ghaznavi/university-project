<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.name"
          prepend-icon="mdi-account-outline"
          :rules="[requiredValidator]"
          label="نام"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.quantity"
          :rules="[requiredValidator]"
          prepend-icon="mdi-counter"
          label="مقدار"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="payload.unit"
          :rules="[requiredValidator]"
          prepend-icon="mdi-ruler"
          label="واحد"
          :items="units"
          item-title="name"
          item-value="id"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.price_per_unit"
          :rules="[requiredValidator]"
          prepend-icon="mdi-money"
          label="قیمت هر واحد"
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
          prepend-icon="mdi-lock-outline"
          label="واحد پول"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-if="payload.currency !== 'افغانی'"
          v-model="payload.currency_price_in_afg"
          :rules="[requiredValidator]"
          prepend-icon="mdi-cash-usd"
          label="نرخ ارز به افغانی"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-calendar"
          type="date"
          label="تاریخ "
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-textarea
          v-model="payload.description"
          :rules="[requiredValidator]"
          prepend-icon="mdi-note"
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

const units = ref([
  {
    id: 'کیلوگرم',
    name: 'کیلوگرم',
  },
  {
    id: 'لیتر',
    name: 'لیتر',
  },
  {
    id: 'متر',
    name: 'متر',
  },
  {
    id: 'تن',
    name: 'تن',
  },
  {
    id: 'بسته',
    name: 'بسته',
  },
  {
    id: 'عدد',
    name: 'عدد',
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
