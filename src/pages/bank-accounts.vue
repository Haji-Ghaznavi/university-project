<template>
  <AddMoney
    ref="addMoneyRef"
    @onAdd="fetchRecord"
  />
  <GetMoney
    ref="getMoneyRef"
    @onTake="fetchRecord"
  />
  <BankAccountSteper
    ref="SteperRef"
    @fetchRecord="fetchRecord"
  />
  <ConfirmDialog
    ref="ConfirmDialogRef"
    @confirm="onConfirm"
  />
  <BreadCrumbs
    :items="breadCrumbs"
    :searchColums="filteredSearchColums"
    v-model:searchBy="searchBy"
    @onCreate="addRecord"
    @onRefresh="fetchRecord"
    @onSearch="searchRecord"
  />
  <DataTable
    :headers="headers"
    :tableRecords="tableRecords"
    :loading="loading"
    :totalPages="totalPages"
    @onPaginate="onPaginate"
  >
    <template #actions="{ record, th }">
      <ActionButton
        @onEdit="editRecord(record)"
        @onDelete="deleteRecord(record)"
        @onView="viewRecord(record)"
        @onCopy="copyRecord(record, th)"
        @onPrint="printRecord(record)"
        :show-edit="true"
        :show-delete="true"
        :show-view="false"
        :isDeleting="isDeleting"
        :show-print="false"
        :show-copy="true"
      />
    </template>
    <template #taken_amount="{ record }">
      <div class="d-flex">
        <v-btn
          @click="takeMoney(record)"
          size="16"
          variant="outlined"
          icon
          class="me-2"
        >
          <v-tooltip activator="parent">برداشت کردن</v-tooltip>
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        {{ record.taken_amount }}
      </div>
    </template>
    <template #added_amount="{ record }">
      <div class="d-flex">
        <v-btn
          @click="addMoney(record)"
          size="16"
          variant="outlined"
          icon
          class="me-2"
        >
          <v-tooltip activator="parent">اضافه کردن</v-tooltip>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        {{ record.added_amount }}
      </div>
    </template>
  </DataTable>
</template>

<script setup>
import AddMoney from '@/components/AddMoney.vue'
import BankAccountSteper from '@/components/BankAccountSteper/BankAccountSteper.vue'
import ActionButton from '@/components/commons/ActionButton.vue'
import BreadCrumbs from '@/components/commons/BreadCrumbs.vue'
import ConfirmDialog from '@/components/commons/ConfirmDialog.vue'
import DataTable from '@/components/commons/DataTable.vue'
import GetMoney from '@/components/GetMoney.vue'
import usePageConfig from '@/page-configs/bank_accounts'
import { axios } from '@/plugins/axios-plugin'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
const { breadCrumbs, headers } = usePageConfig()

const addMoneyRef = ref()
const getMoneyRef = ref()
const SteperRef = ref()
const ConfirmDialogRef = ref()
const loading = ref(false)
const isDeleting = ref(false)
const tableRecords = ref([])
const selectedRecord = ref(null)
const searchBy = ref('id')
const currentPage = ref(1)
const totalPages = ref(null)

const filteredSearchColums = computed(() => {
  const excludedColums = ['actions', 'profile']
  return headers.filter(item => !excludedColums.includes(item.key))
})

const fetchRecord = async (searchValue = null, searchBy) => {
  try {
    loading.value = true
    const { data } = await axios.get('bank-accounts', {
      params: {
        search: searchValue,
        searchBy: searchBy,
        page: currentPage.value,
      },
    })
    tableRecords.value = data.data
    totalPages.value = data.last_page
  } catch (error) {
    console.log('error while fetching the date', error)
  }
  loading.value = false
}

const addRecord = () => {
  SteperRef.value.openDialog()
}

const editRecord = record => {
  SteperRef.value.openEditDialog(record)
}

const deleteRecord = record => {
  selectedRecord.value = record
  ConfirmDialogRef.value.showDialog('delete')
}

const onConfirm = async () => {
  try {
    isDeleting.value = true
    await axios.delete('bank-accounts/' + selectedRecord.value?.id)
  } catch (error) {
    console.log('error while deleting the record', error)
  }
  isDeleting.value = false
  selectedRecord.value = null
}

const searchRecord = searchValue => {
  fetchRecord(searchValue, searchBy.value)
}

const copyRecord = async (record, th) => {
  try {
    const excludedKeys = ['actions']
    const text = th
      .filter(item => !excludedKeys.includes(item.key))
      .map(item => {
        return `${item.title} : ${record[item.key]}`
      })
      .join('\n')
    await navigator.clipboard.writeText(text)
    toast.success('کاپی شد')
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const printRecord = record => {
  console.log('record')
}

const onPaginate = page => {
  currentPage.value = page
  fetchRecord()
}

const addMoney = record => {
  addMoneyRef.value.showDialog(record.id)
}

const takeMoney = record => {
  getMoneyRef.value.showDialog(record.id)
}

onMounted(() => {
  fetchRecord()
})
</script>

<route lang="yaml">
meta:
  auth: true
</route>
