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
          label="اسم"
          :rules="[requiredValidator]"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.father_name"
          prepend-icon="mdi-account-outline"
          label="اسم پدر"
          :rules="[requiredValidator]"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.phone_number"
          prepend-icon="mdi-account-outline"
          label="شماره تماس"
          :rules="[requiredValidator]"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="payload.address"
          prepend-icon="mdi-text"
          label="آدرس"
          rows="2"
          auto-grow
          :rules="[requiredValidator]"
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
