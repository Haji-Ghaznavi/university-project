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
          :item-title="item => item.name + ' ' + item.last_name"
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
          v-model="payload.date"
          :rules="[requiredValidator]"
          prepend-icon="mdi-calendar"
          type="date"
          label="تاریخ"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="payload.status"
          :rules="[requiredValidator]"
          :items="statusOptions"
          item-title="title"
          item-value="value"
          prepend-icon="mdi-list-status"
          label="وضعیت"
        ></v-select>
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
import usePageConfig from '@/page-configs/stuff_attendance'
import { axios } from '@/plugins/axios-plugin'
import { requiredValidator } from '@/plugins/vuelidate/vuelidate'
import { onMounted, ref } from 'vue'

const { statusOptions } = usePageConfig()
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
