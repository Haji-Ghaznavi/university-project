<template>
  <v-row
    justify="center"
    class="mt-6"
  >
    <v-col
      cols="12"
      md="7"
      lg="6"
    >
      <v-card
        elevation="2"
        border
        class="pa-2"
      >
        <v-card-item>
          <div class="d-flex align-center">
            <v-avatar
              color="primary"
              variant="tonal"
              size="56"
              class="me-4"
            >
              <v-icon size="32">mdi-database-arrow-down</v-icon>
            </v-avatar>
            <div>
              <v-card-title class="px-0">پشتیبان گیری از معلومات</v-card-title>
              <v-card-subtitle class="px-0">
                یک نسخه پشتیبان از تمام معلومات دیتابیس دانلود کنید
              </v-card-subtitle>
            </div>
          </div>
        </v-card-item>

        <v-divider class="my-3" />

        <v-card-text>
          <p class="mb-5 text-medium-emphasis">
            با کلیک روی دکمه زیر، یک فایل پشتیبان (JSON) از تمام جداول دیتابیس گرفته شده و به صورت
            خودکار دانلود می‌شود. لطفاً تا تکمیل شدن روند، صفحه را نبندید.
          </p>

          <v-alert
            v-if="errorMessage"
            type="error"
            variant="tonal"
            density="comfortable"
            class="mb-4"
            closable
            @click:close="errorMessage = ''"
          >
            {{ errorMessage }}
          </v-alert>

          <div
            v-if="loading || progress === 100"
            class="mb-2"
          >
            <div class="d-flex justify-space-between mb-1">
              <span class="text-caption">{{ statusText }}</span>
              <span
                v-if="hasTotal"
                class="text-caption font-weight-bold"
              >
                {{ progress }}%
              </span>
            </div>
            <v-progress-linear
              :model-value="progress"
              :indeterminate="loading && !hasTotal"
              :color="progress === 100 ? 'success' : 'primary'"
              height="12"
              rounded
            />
            <div
              v-if="!hasTotal && downloaded"
              class="text-caption mt-1 text-medium-emphasis"
            >
              {{ formatBytes(downloaded) }} دریافت شد
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="px-4 pb-4">
          <v-btn
            color="primary"
            variant="flat"
            size="large"
            block
            :loading="loading"
            prepend-icon="mdi-database-arrow-down"
            @click="startBackup"
          >
            شروع پشتیبان گیری
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { axios } from '@/plugins/axios-plugin'
import moment from 'moment'
import { computed, ref } from 'vue'
import { toast } from 'vue3-toastify'

const loading = ref(false)
const progress = ref(0)
const hasTotal = ref(true)
const downloaded = ref(0)
const errorMessage = ref('')

const statusText = computed(() => {
  if (!loading.value && progress.value === 100)
    return 'پشتیبان گیری مکمل شد ✅'
  if (loading.value && progress.value === 0)
    return 'در حال آماده سازی بکاپ در سرور...'

  return 'در حال دانلود فایل پشتیبان...'
})

const formatBytes = bytes => {
  if (!bytes)
    return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))

  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`
}

const startBackup = async () => {
  try {
    loading.value = true
    progress.value = 0
    hasTotal.value = true
    downloaded.value = 0
    errorMessage.value = ''

    const res = await axios.get('backup', {
      responseType: 'blob',
      skipGlobalError: true,
      onDownloadProgress: event => {
        if (event.total) {
          hasTotal.value = true
          progress.value = Math.round((event.loaded / event.total) * 100)
        } else {
          // Server didn't send Content-Length (e.g. gzipped/chunked):
          // we can only show the amount received, not a percentage.
          hasTotal.value = false
          downloaded.value = event.loaded
        }
      },
    })

    // Resolve the file name from the server, with a sensible fallback
    let fileName = `backup_${moment().format('YYYY_MM_DD_HHmmss')}.json`
    const disposition = res.headers['content-disposition']
    if (disposition) {
      const match = disposition.match(/filename="?([^"]+)"?/)
      if (match)
        fileName = match[1]
    }

    // Trigger the browser download
    const blob = new Blob([res.data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    progress.value = 100
    hasTotal.value = true
    toast.success('بکاپ موفقانه گرفته شد')
  } catch (error) {
    console.log('error while taking the backup', error)
    progress.value = 0
    errorMessage.value = await extractErrorMessage(error)
    toast.error('گرفتن بکاپ ناموفق بود')
  }
  loading.value = false
}

// The error body is a Blob (because responseType is 'blob'); try to read the
// server message out of it, otherwise fall back to a generic message.
const extractErrorMessage = async error => {
  const fallback = 'گرفتن بکاپ ناموفق بود. لطفاً دوباره تلاش کنید یا با تیم فنی تماس بگیرید.'
  try {
    const data = error?.response?.data
    if (data instanceof Blob) {
      const text = await data.text()
      try {
        const parsed = JSON.parse(text)

        return typeof parsed === 'string' ? parsed : parsed?.message ?? fallback
      } catch {
        return text || fallback
      }
    }

    return data?.message ?? fallback
  } catch {
    return fallback
  }
}
</script>

<route lang="yaml">
meta:
  auth: true
</route>
