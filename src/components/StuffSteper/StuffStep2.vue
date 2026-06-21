<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.contract_start_date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-rocket-launch"
          type="date"
          label="شروع قرارداد"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.contract_end_date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-stop"
          type="date"
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
          type="number"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
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
        md="6"
      >
        <v-text-field
          v-model="payload.guarantee"
          :rules="[requiredValidator]"
          prepend-icon="mdi-certificate"
          label="ضمانت"
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
