<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="payload.currency"
          :items="currencies"
          item-title="title"
          item-value="value"
          prepend-icon="mdi-currency-usd"
          label="واحد پول"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.visa_price"
          type="number"
          prepend-icon="mdi-cash"
          label="قیمت ویزا"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.airplane_ticket_price"
          type="number"
          prepend-icon="mdi-airplane-check"
          label="قیمت تکت طیاره"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.paid_amount"
          type="number"
          prepend-icon="mdi-cash-check"
          label="مقدار پرداخت شده"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.introducer"
          prepend-icon="mdi-account-tie"
          label="معرف"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.introducer_phone_number"
          prepend-icon="mdi-phone"
          label="شماره تماس معرف"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-textarea
          v-model="payload.afg_full_address"
          prepend-icon="mdi-map-marker"
          label="آدرس مکمل در افغانستان"
          rows="2"
          auto-grow
        ></v-textarea>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-textarea
          v-model="payload.abroad_full_address"
          prepend-icon="mdi-map-marker-radius"
          label="آدرس مکمل در خارج"
          rows="2"
          auto-grow
        ></v-textarea>
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
import usePageConfig from '@/page-configs/visa_registration'
import { ref } from 'vue'

const { currencies, visaStatuses } = usePageConfig()
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
