<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-autocomplete
          v-model="payload.stuff_id"
          :rules="[requiredValidator]"
          :items="stuffs"
          :loading="loadStuff"
          :item-title="item => item.name + ' ' + item.last_name + ' / معاش ' + item.salary"
          item-value="id"
          prepend-icon="mdi-account-tie"
          label="کارمند"
        ></v-autocomplete>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.paid_amount"
          :rules="[requiredValidator]"
          prepend-icon="mdi-cash-plus"
          label="مبلغ پرداخت شده"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.remaining_amount"
          :rules="[requiredValidator]"
          prepend-icon="mdi-cash-minus"
          label="مبلغ باقی مانده"
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.paid_date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-calendar"
          label="تاریخ پرداخت"
          type="date"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-textarea
          v-model="payload.description"
          prepend-icon="mdi-note"
          label="توضیحات"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { axios } from '@/plugins/axios-plugin'
import { requiredValidator } from '@/plugins/vuelidate/vuelidate'
import { ref } from 'vue'
const props = defineProps({
  payload: {
    type: Object,
    default: () => ({}),
  },
})

const formRef = ref()
const stuffs = ref([])
const loadStuff = ref(false)
const validate = async () => {
  const val = await formRef.value.validate()
  if (val.valid) {
    return true
  } else {
    return false
  }
}

const fetchStuffs = async () => {
  try {
    loadStuff.value = true
    const { data } = await axios.get('suffs/list')
    stuffs.value = data
  } catch (error) {
    console.log('error while fetching the data', error)
  }
  loadStuff.value = false
}

onMounted(() => {
  fetchStuffs()
})
const onLoad = () => {}
defineExpose({
  validate,
  onLoad,
})
</script>
