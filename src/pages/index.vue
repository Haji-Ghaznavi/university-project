<template>
  <BreadCrumbs :items="breadCrumbs" @onCreate="addRecord" />
  <VRow class="match-height mt-13">
    <h1>this is the home</h1>
    <UserSteper ref="SteperRef" />
  </VRow>
</template>

<script setup>
import BreadCrumbs from '@/components/commons/BreadCrumbs.vue'
import UserSteper from '@/components/UserSteper.vue'
import usePageConfig from '@/config/menu/user_menu'
import { ref } from 'vue'
const { breadCrumbs } = usePageConfig()

const SteperRef = ref()

const addRecord = () => {
  SteperRef.value.openDialog()
}
</script>

<route lang="yaml">
meta:
  auth: true
</route>
