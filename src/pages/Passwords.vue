<template>
  <Passwords ref="SteperRef" @fetchRecord="fetchRecord" />
  <ConfirmDialog ref="ConfirmDialogRef" @confirm="onConfirm"/>
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
        :show-view="false"
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
import Passwords from '@/components/PasswordSteper/PasswordSteper.vue'
import usePageConfig from '@/page-configs/passwords'
import { axios } from '@/plugins/axios-plugin'
import { onMounted, ref } from 'vue'
const { breadCrumbs, headers } = usePageConfig()

const SteperRef = ref()
const ConfirmDialogRef = ref();
const loading = ref(false)
const isDeleting = ref(false)
const tableRecords = ref([]);
const selectedRecord = ref(null);
const fetchRecord = async () => {
  try {
    loading.value = true
    const {data} = await axios.get('my-passwords');
    tableRecords.value = data
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

const deleteRecord =  record => {
  selectedRecord.value = record;
  ConfirmDialogRef.value.showDialog('delete');
}

const onConfirm = async () =>{
    try {
    isDeleting.value = true
    await axios.delete('my-passwords/' + selectedRecord.value?.id)
  } catch (error) {
    console.log('error while deleting the record', error)
  }
  isDeleting.value = false
  selectedRecord.value = null;
}

onMounted(() => {
  fetchRecord()
})
</script>

<route lang="yaml">
meta:
  auth: true
</route>
