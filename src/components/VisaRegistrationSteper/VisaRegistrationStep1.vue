<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.name"
          :rules="[requiredValidator]"
          prepend-icon="mdi-account-outline"
          label="نام"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.last_name"
          prepend-icon="mdi-account-outline"
          label="تخلص"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.passport_number"
          prepend-icon="mdi-passport"
          label="شماره پاسپورت"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.phone_number"
          prepend-icon="mdi-phone"
          label="شماره تماس"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.city"
          prepend-icon="mdi-city"
          label="شهر / ولایت"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="payload.visa_type"
          :items="visaTypes"
          item-title="title"
          item-value="value"
          prepend-icon="mdi-card-account-details-outline"
          label="نوع ویزا"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="payload.travel_mode"
          :items="travelModes"
          item-title="title"
          item-value="value"
          prepend-icon="mdi-airplane"
          label="نوع سفر"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.visa_period"
          prepend-icon="mdi-timer-sand"
          label="مدت ویزا"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.visa_taken_date"
          prepend-icon="mdi-calendar-check"
          type="date"
          label="تاریخ اخذ ویزا"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import usePageConfig from '@/page-configs/visa_registration'
import { requiredValidator } from '@/plugins/vuelidate/vuelidate'
import { ref } from 'vue'

const { visaTypes, travelModes } = usePageConfig()
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
