<template>
  <v-dialog
    persistent
    width="1300"
    v-model="dialog"
  >
    <v-card width="1300">
      <v-card-title class="d-flex align-center justify-space-between"
        >اطلاعات روزانه <v-icon @click="dialog = false">mdi-close</v-icon></v-card-title
      >
      <v-divider></v-divider>
      <v-card-text style="height: 700px !important">
        <DataTable
          :headers="headers"
          :tableRecords="tableRecords"
          :loading="loading"
          :totalPages="totalPages"
          @onPaginate="onPaginate"
        >
          <template #profile="{ record }">
            <Profile
              :imageUrl="record.profile"
              size="40"
            />
          </template>
          <template #stuff_id="{ record }">{{ record.stuff.name }}</template>

          <template #product_id="{ record }">
            {{ record.product.name }}
          </template>
          <template #customer_id="{ record }">
            {{ record.customer.name }}
          </template>
        </DataTable>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { axios } from '@/plugins/axios-plugin'
import { ref } from 'vue'
import DataTable from './commons/DataTable.vue'
import Profile from './commons/Profile.vue'

const dialog = ref(false)
const loading = ref(false)
const tableRecords = ref([])
const totalPages = ref(null)
const currentPage = ref(1)

const headers = ref([])

const loadConfig = async table => {
  try {
    const module = await import(`@/page-configs/${table}.js`)
    headers.value = module.default().headers
  } catch (error) {
    console.log('Config not found', error)
  }
}

const showDialog = item => {
  loadConfig(item)
  dialog.value = true
  fetchRecord(item)
}

const fetchRecord = async item => {
  try {
    loading.value = true
    const { data } = await axios.get('daily-reports/list', {
      params: {
        table: item,
        page: currentPage.value,
      },
    })
    tableRecords.value = data.data
    totalPages.value = data.last_page
  } catch (error) {
    console.log('error while fetching the data', error)
  }
  loading.value = false
}

const onPaginate = page => {
  currentPage.value = page
  fetchRecord()
}
defineExpose({
  showDialog,
})
</script>
