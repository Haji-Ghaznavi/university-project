<template>
  <RawMaterialSteper
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
        :show-print="false"
        :show-copy="true"
        :isDeleting="isDeleting"
      />
    </template>
  </DataTable>
</template>

<script setup>
import ActionButton from '@/components/commons/ActionButton.vue'
import BreadCrumbs from '@/components/commons/BreadCrumbs.vue'
import ConfirmDialog from '@/components/commons/ConfirmDialog.vue'
import DataTable from '@/components/commons/DataTable.vue'
import RawMaterialSteper from '@/components/RawMaterialSteper/RawMaterialSteper.vue'
import usePageConfig from '@/page-configs/raw_material'
import { axios } from '@/plugins/axios-plugin'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
const { breadCrumbs, headers } = usePageConfig()

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
  const excludedColums = ['actions']
  return headers.filter(item => !excludedColums.includes(item.key))
})

const fetchRecord = async (searchValue = null, searchBy) => {
  try {
    loading.value = true
    const { data } = await axios.get('raw-materials', {
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
    await axios.delete('raw-materials/' + selectedRecord.value?.id)
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

onMounted(() => {
  fetchRecord()
})
</script>

<route lang="yaml">
meta:
  auth: true
</route>
