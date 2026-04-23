<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.user_name"
          prepend-icon="mdi-account-outline"
          :rules="[requiredValidator]"
          label="نام حساب"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.name"
          :rules="[requiredValidator]"
          prepend-icon="mdi-account-outline"
          label="واحد پولی"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.account_number"
          :rules="[requiredValidator]"
          prepend-icon="mdi-lock-outline"
          label="مقدار پول"
        ></v-text-field>
      </v-col>
            <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.currency"
          :rules="[requiredValidator]"
          prepend-icon="mdi-lock-outline"
          label="مقدار پول"
        ></v-text-field>
      </v-col>
            <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.produced_date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-lock-outline"
          label="مقدار پول"
        ></v-text-field>
      </v-col>
            <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.expired_date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-lock-outline"
          label="مقدار پول"
        ></v-text-field>
      </v-col>
            <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.amount"
          :rules="[requiredValidator]"
          prepend-icon="mdi-lock-outline"
          label="مقدار پول"
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
