<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="12"
        class="d-flex justify-center"
      >
        <profile-selector @onUpload="handleFileUpload" :uploadedFile="uploadedFile"/>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.name"
          prepend-icon="mdi-account-outline"
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
          prepend-icon="mdi-account-outline"
          label="تخلص"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="payload.role"
          :rules="[requiredValidator]"
          prepend-icon="mdi-shield-key-outline"
          label="نقش"
          :items="roles"
          item-title="name"
          item-value="id"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.password"
          :rules="[requiredValidator]"
          prepend-icon="mdi-lock-outline"
          label="پسورد"
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
const uploadedFile = ref(null)
const roles = ref([
  { id: 'admin', name: 'ادمین' },
  { id: 'user', name: 'کاربر' },
])

const handleFileUpload = file => {
  if (file.target?.files?.length > 0) {
    props.payload.profile = file.target.files[0]
    uploadedFile.value = URL.createObjectURL(props.payload.profile)
    console.log('file', props.payload.profile)
  }
}
const validate = async () => {
  const val = await formRef.value.validate()
  if (val.valid) {
    return true
  } else {
    return false
  }
}
defineExpose({
  validate,
})
</script>
