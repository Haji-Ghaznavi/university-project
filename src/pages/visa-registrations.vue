<template>
  <VisaRegistrationSteper
    ref="SteperRef"
    @fetchRecord="fetchRecord"
  />
  <VisaStatusDialog
    ref="StatusDialogRef"
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
    <template #travel_mode="{ record }">
      {{ travelModeLabel(record.travel_mode) }}
    </template>
    <template #visa_done_status="{ record }">
      <v-chip
        size="small"
        variant="tonal"
        :color="statusColor(record.visa_done_status)"
        @click="changeStatus(record)"
      >
        {{ statusLabel(record.visa_done_status) }}
      </v-chip>
    </template>
    <template #created_at="{ record }">
      {{ formatDate(record.created_at) }}
    </template>
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
        :show-print="true"
        :show-copy="true"
        :isDeleting="(selectedRecord == record) & isDeleting ? true : false"
      />
    </template>
  </DataTable>
</template>

<script setup>
import ActionButton from '@/components/commons/ActionButton.vue'
import BreadCrumbs from '@/components/commons/BreadCrumbs.vue'
import ConfirmDialog from '@/components/commons/ConfirmDialog.vue'
import DataTable from '@/components/commons/DataTable.vue'
import VisaRegistrationSteper from '@/components/VisaRegistrationSteper/VisaRegistrationSteper.vue'
import VisaStatusDialog from '@/components/VisaRegistrationSteper/VisaStatusDialog.vue'
import usePageConfig from '@/page-configs/visa_registration'
import { axios } from '@/plugins/axios-plugin'
import { printRecord as printRecordPdf } from '@core/utils/printRecord'
import moment from 'moment'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
const { breadCrumbs, headers, travelModes, visaStatuses } = usePageConfig()

const SteperRef = ref()
const StatusDialogRef = ref()
const ConfirmDialogRef = ref()
const loading = ref(false)
const tableRecords = ref([])
const selectedRecord = ref(null)
const isDeleting = ref(false)
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
    const { data } = await axios.get('visa-registrations', {
      params: {
        search: searchValue,
        searchBy: searchBy,
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
    const res = await axios.delete('visa-registrations/' + selectedRecord.value?.id)
    if (res.request.status === 206) {
      fetchRecord()
    }
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
  printRecordPdf({
    record,
    headers,
    title: breadCrumbs?.[breadCrumbs.length - 1]?.title,
    formatters: {
      travel_mode: travelModeLabel,
      visa_done_status: statusLabel,
      created_at: formatDate,
    },
  })
}

const travelModeLabel = mode => {
  return travelModes.find(item => item.value === mode)?.title ?? mode ?? '—'
}

const statusLabel = status => {
  return visaStatuses.find(item => item.value === status)?.title ?? status ?? '—'
}

const statusColor = status => {
  return visaStatuses.find(item => item.value === status)?.color ?? 'secondary'
}

const changeStatus = record => {
  StatusDialogRef.value.openDialog(record)
}

const formatDate = date => {
  return date ? moment(date).format('YYYY-MM-DD') : '—'
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
