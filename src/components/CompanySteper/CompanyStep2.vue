<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.permission_produced_date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-calendar"
          label="تاریخ صدور جواز"
          type="date"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.permission_expired_date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-calendar"
          label="تاریخ ختم جواز"
          type="date"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.permission_produced_place"
          :rules="[requiredValidator]"
          prepend-icon="mdi-location"
          label="مکان صدور جواز"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.permission_produced_company"
          :rules="[requiredValidator]"
          prepend-icon="mdi-office"
          label="ارگان صادرکننده جواز"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-textarea
          v-model="payload.description"
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
