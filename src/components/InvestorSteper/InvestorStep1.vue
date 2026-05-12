<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.name"
          prepend-icon="mdi-account-details"
          :rules="[requiredValidator]"
          label="اسم"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.last_name"
          :rules="[requiredValidator]"
          prepend-icon="mdi-account-card"
          label="تخلص"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.phone_number"
          :rules="[requiredValidator]"
          prepend-icon="mdi-phone"
          label="شماره تماس"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.address"
          :rules="[requiredValidator]"
          prepend-icon="mdi-location"
          label="آدرس"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.amount"
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
          v-model="payload.currency"
          :rules="[requiredValidator]"
          :items="currencies"
          item-title="name"
          item-value="id"
          prepend-icon="mdi-currency-usd"
          label="واحد پول"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-calendar"
          label="تاریخ"
          type="date"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.remark"
          :rules="[requiredValidator]"
          prepend-icon="mdi-check"
          label="ملاحظات"
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
