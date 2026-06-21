<template>
  <v-dialog
    v-model="show"
    persistent
    width="900"
    scrollable
    transition="dialog-top-transition"
  >
    <v-card height="650">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>ثبت حاضری روزانه کارمندان</span>
        <v-btn
          icon
          size="small"
          variant="text"
          @click="close"
        >
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text>
        <v-row class="mb-1">
          <v-col
            cols="12"
            md="5"
          >
            <v-text-field
              v-model="date"
              type="date"
              label="تاریخ"
              prepend-icon="mdi-calendar"
              hide-details
              @update:model-value="loadAttendance"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-table
          fixed-header
          height="420"
        >
          <thead>
            <tr>
              <th style="width: 1%">#</th>
              <th>کارمند</th>
              <th style="min-width: 220px">وضعیت</th>
              <th style="min-width: 240px">توضیحات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loadStuff">
              <td
                colspan="4"
                class="text-center py-6"
              >
                <v-progress-circular indeterminate />
              </td>
            </tr>
            <tr
              v-for="(rec, i) in records"
              :key="rec.stuff_id"
            >
              <td>{{ i + 1 }}</td>
              <td style="white-space: nowrap">{{ rec.name }}</td>
              <td>
                <v-select
                  v-model="rec.status"
                  :items="statusOptions"
                  item-title="title"
                  item-value="value"
                  density="compact"
                  variant="outlined"
                  hide-details
                ></v-select>
              </td>
              <td>
                <v-text-field
                  v-model="rec.description"
                  density="compact"
                  variant="outlined"
                  placeholder="توضیحات"
                  hide-details
                ></v-text-field>
              </td>
            </tr>
            <tr v-if="!loadStuff && !records.length">
              <td
                colspan="4"
                class="text-center py-6"
              >
                کارمندی یافت نشد
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-divider />

      <v-card-actions class="justify-end pa-3">
        <v-btn
          variant="text"
          @click="close"
        >
          انصراف
        </v-btn>
        <v-btn
          color="primary"
          variant="flat"
          :loading="loading"
          :disabled="!date || !records.length"
          @click="submit"
        >
          ثبت حاضری
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import usePageConfig from '@/page-configs/stuff_attendance'
import { axios } from '@/plugins/axios-plugin'
import moment from 'moment'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const { statusOptions } = usePageConfig()
const emit = defineEmits(['fetchRecord'])

const show = ref(false)
const loading = ref(false)
const loadStuff = ref(false)
const date = ref('')
const records = ref([])

const openDialog = () => {
  date.value = moment().format('YYYY-MM-DD')
  show.value = true
  loadStuffs()
}

// 👉 Load every staff member as an attendance row (default: present)
const loadStuffs = async () => {
  try {
    loadStuff.value = true
    const { data } = await axios.get('suffs/list')
    records.value = data.map(stuff => ({
      stuff_id: stuff.id,
      name: `${stuff.name ?? ''} ${stuff.last_name ?? ''}`.trim(),
      status: 'present',
      description: '',
    }))
    await loadAttendance()
  } catch (error) {
    console.log('error while fetching the staff', error)
  }
  loadStuff.value = false
}

// 👉 Prefill statuses from any attendance already saved for the chosen date
const loadAttendance = async () => {
  if (!date.value || !records.value.length)
    return

  records.value.forEach(row => {
    row.status = 'present'
    row.description = ''
  })

  try {
    let page = 1
    let lastPage = 1
    do {
      const { data } = await axios.get('stuff-attendances', {
        params: { date: date.value, page },
      })
      const existing = data.data ?? []
      existing.forEach(att => {
        const row = records.value.find(r => r.stuff_id === att.stuff_id)
        if (row) {
          row.status = att.status
          row.description = att.description ?? ''
        }
      })
      lastPage = data.last_page ?? 1
      page++
    } while (page <= lastPage)
  } catch (error) {
    console.log('error while fetching the attendance', error)
  }
}

const submit = async () => {
  try {
    loading.value = true
    const res = await axios.post('stuff-attendances/bulk', {
      date: date.value,
      records: records.value.map(row => ({
        stuff_id: row.stuff_id,
        status: row.status,
        description: row.description,
      })),
    })
    if (res.request.status === 200) {
      toast.success('حاضری موفقانه ثبت شد')
      emit('fetchRecord')
      close()
    }
  } catch (error) {
    console.log('error while saving the attendance', error)
  }
  loading.value = false
}

const close = () => {
  show.value = false
  loading.value = false
  records.value = []
  date.value = ''
}

defineExpose({
  openDialog,
})
</script>
