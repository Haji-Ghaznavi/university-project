<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.contract_end_date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-stop"
          label="ختم قرارداد"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.salary"
          :rules="[requiredValidator]"
          prepend-icon="mdi-cash"
          label="معاش"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md=""
      >
        <v-text-field
          v-model="payload.currency"
          :rules="[requiredValidator]"
          prepend-icon="mdi-cash"
          label="واحد پول "
        ></v-text-field>
      </v-col>
            <v-col
        cols="12"
        md=""
      >
        <v-text-field
          v-model="payload.identity_card_number"
          :rules="[requiredValidator]"
          prepend-icon="mdi-cash"
          label=" نمبر تذکره "
        ></v-text-field>
      </v-col>
            <v-col
        cols="12"
        md=""
      >
        <v-text-field
          v-model="payload.full_address"
          :rules="[requiredValidator]"
          prepend-icon="mdi-cash"
          label=" آدرس کامل "
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

const onLoad = () => {}

defineExpose({
  validate,
  onLoad,
})
</script>
