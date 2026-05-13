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
          prepend-icon="mdi-company"
          label="نام شرکت"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.head_name"
          :rules="[requiredValidator]"
          prepend-icon="mdi-account-tie"
          label="نام ریس شرکت"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.head_last_name"
          :rules="[requiredValidator]"
          prepend-icon="mdi-account-details"
          label="تخلص ریس شرکت"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.head_phone_number"
          :rules="[requiredValidator]"
          prepend-icon="mdi-phone"
          label="شماره تلفن ریس شرکت"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.assistant_name"
          :rules="[requiredValidator]"
          prepend-icon="mdi-assistant"
          label="نام معاون شرکت"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.assistant_last_name"
          prepend-icon="mdi-account-details"
          label="تخلص معاون شرکت"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.assistant_phone_number"
          prepend-icon="mdi-phone"
          label="شماره تلفن معاون شرکت"
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
