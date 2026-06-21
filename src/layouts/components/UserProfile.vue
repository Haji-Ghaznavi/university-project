<template>
  <ConfirmDialog
    ref="confirmRef"
    @confirm="logout"
  />
  <VBadge v-bind="avatarBadgeProps">
    <v-img
      :src="profile"
      style="width: 45px; height: 45px ;cursor: pointer;"
      cover
      class="rounded-circle"
    >
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge v-bind="avatarBadgeProps">
                  <v-img
                    :src="profile"
                    style="width: 45px; height: 45px"
                    cover
                    class="rounded-circle"
                  ></v-img>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ store.user?.name }}
            </VListItemTitle>
            <VListItemSubtitle class="text-disabled">
              {{ store.user?.role }}
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem style="cursor: pointer">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-logout-variant"
                size="22"
              />
            </template>

            <VListItemTitle @click="confirmRef.showDialog('logout')"> خروج </VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </v-img>
  </VBadge>
</template>

<script setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import ConfirmDialog from '@/components/commons/ConfirmDialog.vue'
import { axios } from '@/plugins/axios-plugin'
import router from '@/router'
import { useStoreAuth } from '@/store/authStore'
import { computed } from 'vue'
const confirmRef = ref()

const store = useStoreAuth()

const profile = computed(() => {
  return store.user?.profile ? import.meta.env.VITE_API_URL + 'storage/' + store.user?.profile : avatar1
})
const avatarBadgeProps = {
  dot: true,
  location: 'bottom right',
  offsetX: 3,
  offsetY: 3,
  color: 'success',
  bordered: true,
}

async function logout() {
  try {
    const res = await axios.post('logout')
    store.$logout()
    router.push('/login')
  } catch (error) {
    console.error('error', error)
  }
}
</script>
