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
          label="نام اموال"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.quantity"
          :rules="[requiredValidator]"
          prepend-icon="mdi-account-outline"
          label="تعداد اموال"
        ></v-text-field>
      </v-col>


      <v-col
        cols="12"
        md="6"
      >
        <v-textarea
          v-model="payload.description"
          :rules="[requiredValidator]"
          prepend-icon="mdi-lock-outline"
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
const roles = ref([
  { id: 'admin', name: 'ادمین' },
  { id: 'user', name: 'کاربر' },
])



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
