<template>
  <UserSteper ref="SteperRef" />
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
        :isDeleting="isDeleting"
      />
    </template>
  </DataTable>
</template>

<script setup>
import ActionButton from '@/components/commons/ActionButton.vue'
import BreadCrumbs from '@/components/commons/BreadCrumbs.vue'
import DataTable from '@/components/commons/DataTable.vue'
import UserSteper from '@/components/UserSteper/UserSteper.vue'
import usePageConfig from '@/page-configs/user'
import { axios } from '@/plugins/axios-plugin'
import { onMounted, ref } from 'vue'
const { breadCrumbs, headers } = usePageConfig()

const SteperRef = ref()
const loading = ref(false)
const isDeleting = ref(false)
const tableRecords = ref([]);
const fetchRecord = async () => {
  try {
    loading.value = true
    const {data} = await axios.get('');
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

const deleteRecord = async record => {
  try {
    isDeleting.value = true
    await axios.delete('' + record.id)
  } catch (error) {
    console.log('error while deleting the record', error)
  }
  isDeleting.value = false
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
