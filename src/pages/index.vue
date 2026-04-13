<template>
  <BreadCrumbs
    :items="breadCrumbs"
    @onCreate="addRecord"
  />
  <DataTable
    :headers="headers"
    :tableRecords="tableRecords"
    :loading="loading"
  />
  <UserSteper ref="SteperRef" />
</template>

<script setup>
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
    name: 'سمیع الله',
    last_name: 'حسینی',
    phone_number: '07980789',
  },
  {
    name: 'هادی',
    last_name: 'مظفری',
    phone_number: '07980789',
  },
  {
    name: 'ذکریا',
    last_name: 'فانوس',
    phone_number: '07980789',
  },
]

const addRecord = () => {
  SteperRef.value.openDialog()
}
</script>

<route lang="yaml">
meta:
  auth: true
</route>
