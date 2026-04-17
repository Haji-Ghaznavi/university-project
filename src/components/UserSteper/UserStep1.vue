<template>
  <v-form
    ref="formRef"
  >
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.name"
          :rules="[requiredValidator]"
          label="Name"
          variant="outlined"
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
defineExpose({
  validate,
})
</script>
