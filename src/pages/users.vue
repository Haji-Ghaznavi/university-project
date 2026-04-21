<template>
  <UserSteper
    ref="SteperRef"
    @fetchRecord="fetchRecord"
  />
  <ConfirmDialog
    ref="ConfirmDialogRef"
    @confirm="onConfirm"
  />
  <BreadCrumbs
    :items="breadCrumbs"
    @onCreate="addRecord"
    @onRefresh="fetchRecord"
  />
  <DataTable
    :headers="headers"
    :tableRecords="tableRecords"
    :loading="loading"
  >
    <template #actions="{ record }">
      <ActionButton
        @onEdit="editRecord(record)"
        @onDelete="deleteRecord(record)"
        @onView="viewRecord(record)"
        :show-edit="true"
        :show-delete="true"
        :show-view="true"
        :isDeleting="(selectedRecord == record) & isDeleting ? true : false"
      />
    </template>

    <template #profile="{ record }">
      <Profile
        :imageUrl="record.profile"
        size="40"
      />
    </template>

    <template #role="{record}">
      {{ record.role == 'admin' ? 'ادمین' : 'کاربر' }}
    </template>
  </DataTable>
</template>

<script setup>
import ActionButton from '@/components/commons/ActionButton.vue'
import BreadCrumbs from '@/components/commons/BreadCrumbs.vue'
import ConfirmDialog from '@/components/commons/ConfirmDialog.vue'
import DataTable from '@/components/commons/DataTable.vue'
import Profile from '@/components/commons/Profile.vue'
import UserSteper from '@/components/UserSteper/UserSteper.vue'
import usePageConfig from '@/page-configs/user'
import { axios } from '@/plugins/axios-plugin'
import { onMounted, ref } from 'vue'
const { breadCrumbs, headers } = usePageConfig()

const SteperRef = ref()
const ConfirmDialogRef = ref()
const loading = ref(false)
const tableRecords = ref([])
const selectedRecord = ref(null)
const isDeleting = ref(false)
const fetchRecord = async () => {
  try {
    loading.value = true
    const { data } = await axios.get('users')
    tableRecords.value = data
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
    const res = await axios.delete('users/' + selectedRecord.value?.id)
    if (res.request.status === 206) {
      fetchRecord()
    }
  } catch (error) {
    console.log('error while deleting the record', error)
  }
  isDeleting.value = false
  selectedRecord.value = null
}

const viewRecord = () => {
  console.log('view record')
}

onMounted(() => {
  fetchRecord()
})
</script>

<route lang="yaml">
meta:
  auth: true
</route>
