<template>
  <v-form ref="formRef">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-autocomplete
          v-model="payload.company_id"
          :rules="[requiredValidator]"
          :items="companies"
          :loading="loadCompany"
          item-title="name"
          item-value="id"
          prepend-icon="mdi-company"
          label="شرکت"
        ></v-autocomplete>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="payload.report_type"
          :rules="[requiredValidator]"
          :items="['اول', 'دوم', 'سوم', 'چهارم', 'سالانه']"
          prepend-icon="mdi-graph"
          label="ربع"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="payload.activity_type"
          :rules="[requiredValidator]"
          :items="['بلی', 'نخیر']"
          prepend-icon="mdi-pipe"
          label="نوع فعالیت"
        ></v-select>
      </v-col>

      <v-col
        v-if="payload.activity_type == 'بلی'"
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.amount"
          :rules="[requiredValidator]"
          prepend-icon="mdi-lock-outline"
          label="مبلغ پرداخت شده"
        ></v-text-field>
      </v-col>
      <v-col
        v-if="payload.activity_type == 'بلی'"
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="payload.date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-lock-outline"
          label="تاریخ پرداخت"
          type="date"
        ></v-text-field>
      </v-col>
      <v-col
        v-if="payload.activity_type == 'بلی'"
        cols="12"
        md="6"
      >
        <v-textarea
          v-model="payload.description"
          prepend-icon="mdi-lock-outline"
          label="توضیحات"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { axios } from '@/plugins/axios-plugin'
import { requiredValidator } from '@/plugins/vuelidate/vuelidate'
import { ref, watch } from 'vue'
const props = defineProps({
  payload: {
    type: Object,
    default: () => ({}),
  },
})

const formRef = ref()
const companies = ref([])
const loadCompany = ref(false)

watch(() => props.payload.activity_type, (value) => {
  if(value == 'نخیر') {
    props.payload.amount = ''
    props.payload.date = ''
    props.payload.description = ''
  }
})
const validate = async () => {
  const val = await formRef.value.validate()
  if (val.valid) {
    return true
  } else {
    return false
  }
}

const fetchCompanies = async () => {
  try {
    loadCompany.value = true
    const { data } = await axios.get('companies/list')
    companies.value = data
  } catch (error) {
    console.log('error while fetching the data', error)
  }
  loadCompany.value = false
}

onMounted(() => {
  fetchCompanies()
})
const onLoad = () => {}
defineExpose({
  validate,
  onLoad,
})
</script>
