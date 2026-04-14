<template>
  <UserSteper ref="SteperRef" />
  <BreadCrumbs
    :items="breadCrumbs"
    @onCreate="addRecord"
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
      />
    </template>
  </DataTable>
  <h1>this is unless</h1>
</template>

<script setup>
import ActionButton from '@/components/commons/ActionButton.vue'
import BreadCrumbs from '@/components/commons/BreadCrumbs.vue'
import DataTable from '@/components/commons/DataTable.vue'
import UserSteper from '@/components/UserSteper.vue'
import usePageConfig from '@/config/menu/user_menu'
import { ref } from 'vue'
const { breadCrumbs, headers } = usePageConfig()

const SteperRef = ref()
const loading = ref(false)

const tableRecords = [
  {
    id: 1,
    name: 'سمیع الله',
    last_name: 'حسینی',
    phone_number: '07980789',
    email: 'email@gmail.com',
  },
  {
    id: 2,

    name: 'هادی',
    last_name: 'مظفری',
    phone_number: '07980789',
    email: 'email@gmail.com',
  },
  {
    id: 3,
    name: 'ذکریا',
    last_name: 'فانوس',
    phone_number: '07980789',
    email: 'email@gmail.com',
  },
]

const addRecord = () => {
  SteperRef.value.openDialog()
}

const editRecord = () => {
console.log('record edited');
}


const deleteRecord = () => {
console.log('record deleted');
  
}


const viewRecord = () => {
console.log('view record');
  
}
</script>

<route lang="yaml">
meta:
  auth: true
</route>
