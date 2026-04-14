<template>
  <v-form ref="formRef">
    <v-text-field v-model="payload.name" :rules="[requiredValidator]"></v-text-field>
  </v-form>
</template>

<script setup>
import { requiredValidator } from '@/plugins/vuelidate/vuelidate';
import { ref } from 'vue';
const props = defineProps({
  payload: {
    type: Object,
    default: () => ({}),
  },
})


const formRef = ref();



const validate = async () => {
  const val = await formRef.value.validate();
  if(val.valid){
    return true;
  }else{
    return false;
  }

}
defineExpose({
  validate,
})
</script>
