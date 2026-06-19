<template>
  <v-dialog
    v-model="show"
    persistent
    width="820"
    scrollable
    transition="dialog-top-transition"
  >
    <v-card height="640">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>گزارش غیر حاضری کارمندان</span>
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
            md="4"
          >
            <v-text-field
              v-model="from"
              type="date"
              label="از تاریخ"
              prepend-icon="mdi-calendar-start"
              density="compact"
              hide-details
              @update:model-value="fetchReport"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="to"
              type="date"
              label="تا تاریخ"
              prepend-icon="mdi-calendar-end"
              density="compact"
              hide-details
              @update:model-value="fetchReport"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
            class="d-flex align-center"
          >
            <v-btn
              color="primary"
              variant="flat"
              block
              :loading="loading"
              prepend-icon="mdi-refresh"
              @click="fetchReport"
            >
              نمایش گزارش
            </v-btn>
          </v-col>
        </v-row>

        <v-table
          fixed-header
          height="430"
        >
          <thead>
            <tr>
              <th style="width: 1%">#</th>
              <th>کارمند</th>
              <th style="width: 1%; white-space: nowrap">روزهای غیر حاضری</th>
              <th>تاریخ های غیر حاضری</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td
                colspan="4"
                class="text-center py-6"
              >
                <v-progress-circular indeterminate />
              </td>
            </tr>
            <tr
              v-for="(row, i) in report"
              v-else
              :key="row.stuff_id"
            >
              <td>{{ i + 1 }}</td>
              <td style="white-space: nowrap">{{ `${row.name ?? ''} ${row.last_name ?? ''}`.trim() }}</td>
              <td class="text-center">
                <v-chip
                  size="small"
                  :color="row.absent_days > 0 ? 'error' : 'success'"
                >
                  {{ row.absent_days }}
                </v-chip>
              </td>
              <td style="white-space: normal">{{ formatDates(row.dates) }}</td>
            </tr>
            <tr v-if="!loading && !report.length">
              <td
                colspan="4"
                class="text-center py-6"
              >
                معلوماتی یافت نشد
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-divider />

      <v-card-actions class="justify-space-between pa-3">
        <span class="text-caption text-medium-emphasis">
          مجموع غیر حاضری ها: {{ totalAbsent }} روز
        </span>
        <v-btn
          variant="text"
          @click="close"
        >
          بستن
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { axios } from '@/plugins/axios-plugin'
import moment from 'moment'
import { computed, ref } from 'vue'

const show = ref(false)
const loading = ref(false)
const from = ref('')
const to = ref('')
const report = ref([])

const totalAbsent = computed(() => report.value.reduce((sum, row) => sum + (row.absent_days || 0), 0))

const openDialog = () => {
  from.value = moment().subtract(1, 'month').format('YYYY-MM-DD')
  to.value = moment().format('YYYY-MM-DD')
  show.value = true
  fetchReport()
}

const fetchReport = async () => {
  if (!from.value || !to.value)
    return

  try {
    loading.value = true
    const { data } = await axios.get('stuff-attendances/absent-report', {
      params: {
        from: from.value,
        to: to.value,
      },
    })
    report.value = data.report ?? []
  } catch (error) {
    console.log('error while fetching the absent report', error)
  }
  loading.value = false
}

const formatDates = dates => {
  if (!dates || !dates.length)
    return '—'

  return dates.map(date => moment(date).format('YYYY-MM-DD')).join('، ')
}

const close = () => {
  show.value = false
  loading.value = false
  report.value = []
}

defineExpose({
  openDialog,
})
</script>
