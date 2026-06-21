<template>
  <v-form ref="formRef">
    <v-row>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.name"
          prepend-icon="mdi-person"
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
          prepend-icon="mdi-account-details"
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
          prepend-icon="mdi-phone"
          label="شماره تماس"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.address"
          :rules="[requiredValidator]"
          prepend-icon="mdi-location"
          label="آدرس"
        ></v-text-field>
      </v-col>
            <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.position"
          :rules="[requiredValidator]"
          prepend-icon="mdi-rank"
          label="مقام"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="payload.description"
          prepend-icon="mdi-text"
          label="توضیحات"
          rows="2"
          auto-grow
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
