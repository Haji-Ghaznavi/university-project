<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="12"
        class="d-flex justify-center"
      >
        <profile-selector @onUpload="handleFileUpload" />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.name"
          prepend-icon="mdi-account-circle"
          :rules="[requiredValidator]"
          label="اسم"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.father_name"
          :rules="[requiredValidator]"
          prepend-icon="mdi-card-account-details"
          label="نام پدر"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.last_name"
          :rules="[requiredValidator]"
          prepend-icon="mdi-account-outline"
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
          prepend-icon="mdi-phone-outline"
          label="شماره تماس"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.contract_type"
          :rules="[requiredValidator]"
          prepend-icon="mdi-file-sign"
          label="نوع قرارداد"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.contract_start_date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-rocket-launch"
          label="شروع قرارداد"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { requiredValidator } from '@/plugins/vuelidate/vuelidate'
import { ref } from 'vue'
import ProfileSelector from '../commons/ProfileSelector.vue'
const props = defineProps({
  payload: {
    type: Object,
    default: () => ({}),
  },
})

const formRef = ref()
const roles = ref([
  { id: 'admin', name: 'ادمین' },
  { id: 'user', name: 'کاربر' },
])

const handleFileUpload = file => {
  props.payload.profile = file
  console.log('file', props.payload.profile)
}
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
