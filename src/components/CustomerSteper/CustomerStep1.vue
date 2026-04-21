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
        <v-select
          v-model="payload.category"
          :rules="[requiredValidator]"
          prepend-icon="mdi-view-list"
          label="کتگوری"
          :items="categories"
          item-title="name"
          item-value="id"
        ></v-select>
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
const categories = ref([
  {
    id: 'A',
    name: 'A',
  },
  {
    id: 'B',
    name: 'B',
  },
  {
    id: 'C',
    name: 'C',
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
defineExpose({
  validate,
})
</script>
