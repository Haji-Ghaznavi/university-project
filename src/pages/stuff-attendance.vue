<template>
  <AttendanceTakeDialog
    ref="TakeDialogRef"
    @fetchRecord="fetchRecord"
  />
  <StuffAttendanceSteper
    ref="SteperRef"
    @fetchRecord="fetchRecord"
  />
  <ConfirmDialog
    ref="ConfirmDialogRef"
    @confirm="onConfirm"
  />

  <v-card
    elevation="1"
    class="pe-2"
  >
    <v-card-text class="d-flex align-center justify-space-between flex-wrap pa-0">
      <v-breadcrumbs :items="breadCrumbs">
        <template v-slot:prepend>
          <v-icon
            icon="mdi-home"
            size="small"
          ></v-icon>
        </template>
      </v-breadcrumbs>
      <div class="d-flex align-center">
        <v-text-field
          v-model="filterDate"
          type="date"
          density="compact"
          class="me-3 mb-1"
          style="min-width: 220px"
          hide-details
          clearable
          @update:model-value="onFilter"
        >
          <v-tooltip activator="parent">فیلتر بر اساس تاریخ</v-tooltip>
        </v-text-field>
        <v-btn
          @click="fetchRecord"
          class="float-start"
        >
          <v-tooltip activator="parent">تازه سازی</v-tooltip>
          <v-icon size="22">mdi-refresh</v-icon>
        </v-btn>
        <v-btn
          color="primary"
          prepend-icon="mdi-clipboard-check-outline"
          class="float-start ms-2"
          @click="takeAttendance"
        >
          ثبت حاضری روزانه
        </v-btn>
      </div>
    </v-card-text>
  </v-card>

  <DataTable
    :headers="headers"
    :tableRecords="tableRecords"
    :loading="loading"
    :totalPages="totalPages"
    @onPaginate="onPaginate"
  >
    <template #stuff="{ record }">
      {{ stuffName(record) }}
    </template>
    <template #date="{ record }">
      {{ formatDate(record.date) }}
    </template>
    <template #status="{ record }">
      <v-chip
        size="small"
        :color="statusColor(record.status)"
      >
        {{ statusLabel(record.status) }}
      </v-chip>
    </template>
    <template #actions="{ record }">
      <ActionButton
        @onEdit="editRecord(record)"
        @onDelete="deleteRecord(record)"
        :show-edit="true"
        :show-delete="true"
        :show-view="false"
        :show-print="false"
        :show-copy="false"
        :isDeleting="(selectedRecord == record) & isDeleting ? true : false"
      />
    </template>
  </DataTable>
</template>

<script setup>
import ActionButton from '@/components/commons/ActionButton.vue'
import ConfirmDialog from '@/components/commons/ConfirmDialog.vue'
import DataTable from '@/components/commons/DataTable.vue'
import AttendanceTakeDialog from '@/components/StuffAttendanceSteper/AttendanceTakeDialog.vue'
import StuffAttendanceSteper from '@/components/StuffAttendanceSteper/StuffAttendanceSteper.vue'
import usePageConfig from '@/page-configs/stuff_attendance'
import { axios } from '@/plugins/axios-plugin'
import moment from 'moment'
import { onMounted, ref } from 'vue'
const { breadCrumbs, headers, statusOptions } = usePageConfig()

const TakeDialogRef = ref()
const SteperRef = ref()
const ConfirmDialogRef = ref()
const loading = ref(false)
const tableRecords = ref([])
const selectedRecord = ref(null)
const isDeleting = ref(false)
const filterDate = ref(null)
const currentPage = ref(1)
const totalPages = ref(null)

const fetchRecord = async () => {
  try {
    loading.value = true
    const { data } = await axios.get('stuff-attendances', {
      params: {
        date: filterDate.value,
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

const onFilter = () => {
  currentPage.value = 1
  fetchRecord()
}

const takeAttendance = () => {
  TakeDialogRef.value.openDialog()
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
    const res = await axios.delete('stuff-attendances/' + selectedRecord.value?.id)
    if (res.request.status === 206) {
      fetchRecord()
    }
  } catch (error) {
    console.log('error while deleting the record', error)
  }
  isDeleting.value = false
  selectedRecord.value = null
}

const stuffName = record => {
  const stuff = record.stuff
  if (stuff) return `${stuff.name ?? ''} ${stuff.last_name ?? ''}`.trim()

  return record.stuff_id
}

const statusLabel = status => {
  return statusOptions.find(item => item.value === status)?.title ?? status ?? '—'
}

const statusColor = status => {
  return statusOptions.find(item => item.value === status)?.color ?? 'secondary'
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
