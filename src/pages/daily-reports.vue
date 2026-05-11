<template>
  <div class="pa-4">
    <v-row v-if="loaded">
      <v-col
        cols="12"
        md="3"
        v-for="[key, value] in reports"
        :key="key"
      >
        <v-card style="cursor: pointer">
          <v-card-title class="d-flex align-center pt-3">
            <v-chip
              variant="tonal"
              label
              :color="applyStyle(key).color"
              class="me-3"
            >
              <v-icon>
                {{ applyStyle(key).icon }}
              </v-icon>
            </v-chip>

            {{ applyStyle(key).title }}
          </v-card-title>

          <v-card-text class="pt-2">
            {{ value.length }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div
      v-else
      style="width: 100%; height: 100dvh; display: flex; align-items: center; justify-content: center"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script setup>
import { axios } from '@/plugins/axios-plugin'
import { onMounted, ref } from 'vue'

const reports = ref([])
const loaded = ref(false)

const applyStyle = key => {
  switch (key) {
    case 'bank_accounts':
      return {
        color: '#2E7D32',
        icon: 'mdi-bank',
        title: 'حسابات بانکی',
      }

    case 'companies':
      return {
        color: '#1565C0',
        icon: 'mdi-domain',
        title: 'شرکت‌ها',
      }

    case 'company_goods':
      return {
        color: '#3949AB',
        icon: 'mdi-package-variant-closed',
        title: 'اموال شرکت',
      }

    case 'company_reports':
      return {
        color: '#0288D1',
        icon: 'mdi-file-chart',
        title: 'گزارشات شرکت',
      }

    case 'contacts':
      return {
        color: '#00897B',
        icon: 'mdi-card-account-phone',
        title: 'مخاطبین',
      }

    case 'customers':
      return {
        color: '#5E35B1',
        icon: 'mdi-account-group',
        title: 'مشتریان',
      }

    case 'daily_expenses':
      return {
        color: '#C62828',
        icon: 'mdi-cash-remove',
        title: 'مصارف روزانه',
      }

    case 'daily_tasks':
      return {
        color: '#00ACC1',
        icon: 'mdi-clipboard-check-outline',
        title: 'وظایف روزانه',
      }

    case 'daily_transactions':
      return {
        color: '#43A047',
        icon: 'mdi-cash-sync',
        title: 'معاملات روزانه',
      }

    case 'estates':
      return {
        color: '#6D4C41',
        icon: 'mdi-home-city',
        title: 'دارایی‌ها',
      }

    case 'investors':
      return {
        color: '#FFB300',
        icon: 'mdi-handshake',
        title: 'سرمایه‌گذاران',
      }

    case 'my_passwords':
      return {
        color: '#424242',
        icon: 'mdi-lock-outline',
        title: 'رمزها',
      }

    case 'office_warehouse_expenses':
      return {
        color: '#FB8C00',
        icon: 'mdi-warehouse',
        title: 'مصارف دفتر و کارخانه',
      }

    case 'personal_goods':
      return {
        color: '#D81B60',
        icon: 'mdi-bag-personal',
        title: 'اموال شخصی',
      }

    case 'products':
      return {
        color: '#8E24AA',
        icon: 'mdi-package-variant',
        title: 'محصولات',
      }

    case 'production_capacities':
      return {
        color: '#039BE5',
        icon: 'mdi-factory',
        title: 'ظرفیت تولید',
      }

    case 'product_sales':
      return {
        color: '#C0CA33',
        icon: 'mdi-cart-arrow-right',
        title: 'فروشات محصولات',
      }

    case 'raw_materials':
      return {
        color: '#546E7A',
        icon: 'mdi-cube-outline',
        title: 'مواد خام',
      }

    case 'stuffs':
      return {
        color: '#303F9F',
        icon: 'mdi-account-hard-hat',
        title: 'کارمندان',
      }

    case 'stuff_payment_salaries':
      return {
        color: '#388E3C',
        icon: 'mdi-cash-check',
        title: 'معاشات کارمندان',
      }

    case 'users':
      return {
        color: '#1976D2',
        icon: 'mdi-account-multiple-outline',
        title: 'کاربران',
      }

    default:
      return {
        color: '#616161',
        icon: 'mdi-file-outline',
        title: key,
      }
  }
}

const fetchData = async () => {
  try {
    const { data } = await axios.get('daily-reports')
    reports.value = Object.entries(data)
    loaded.value = true
  } catch (error) {
    console.log('error while fetching the data', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>
