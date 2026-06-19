<template>
  <div class="pa-4">
    <!-- 👉 Welcome hero -->
    <v-card
      class="dashboard-hero mb-6"
      flat
    >
      <div class="hero-overlay" />
      <v-card-text class="hero-content d-flex flex-wrap align-center justify-space-between">
        <div>
          <h1 class="text-h4 font-weight-bold text-white mb-1">
            خوش آمدید 👋
          </h1>
          <p class="text-subtitle-1 text-white mb-0" style="opacity: 0.9">
            سیستم مدیریت شرکت احمد شاه — مدیریت معاملات، کارمندان، محصولات و امور مالی در یک جا
          </p>
        </div>
        <div class="text-white text-end mt-4 mt-sm-0">
          <div class="d-flex align-center justify-end gap-2">
            <v-icon size="22">mdi-calendar-month-outline</v-icon>
            <span class="text-h6 font-weight-medium">{{ today }}</span>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- 👉 Loading -->
    <div
      v-if="loadingData"
      style="width: 100%; height: 40dvh; display: flex; align-items: center; justify-content: center"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </div>

    <template v-else>
      <!-- 👉 Stat cards -->
      <v-row>
        <v-col
          v-for="card in statCards"
          :key="card.key"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card
            class="stat-card h-100"
            @click="goTo(card.to)"
          >
            <v-card-text class="d-flex align-center justify-space-between">
              <div>
                <p class="text-body-2 text-medium-emphasis mb-1">{{ card.title }}</p>
                <h2 class="text-h4 font-weight-bold">{{ card.value }}</h2>
              </div>
              <v-avatar
                rounded
                size="52"
                :color="card.color"
                variant="tonal"
              >
                <v-icon size="28">{{ card.icon }}</v-icon>
              </v-avatar>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 👉 Quick access -->
      <h2 class="text-h6 font-weight-bold mt-8 mb-4">دسترسی سریع</h2>
      <v-row>
        <v-col
          v-for="link in quickLinks"
          :key="link.to"
          cols="6"
          sm="4"
          md="2"
        >
          <v-card
            class="quick-link text-center pa-4 h-100"
            @click="goTo(link.to)"
          >
            <v-avatar
              size="48"
              :color="link.color"
              variant="tonal"
              class="mb-3"
            >
              <v-icon size="26">{{ link.icon }}</v-icon>
            </v-avatar>
            <p class="text-body-2 font-weight-medium mb-0">{{ link.title }}</p>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script setup>
import { axios } from '@/plugins/axios-plugin'
import moment from 'moment'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const reports = ref({})
const loadingData = ref(false)

const today = computed(() => moment().format('dddd, YYYY-MM-DD'))

// 👉 Highlighted summary cards (value pulled live from daily-reports)
const cardMeta = [
  { key: 'customer', title: 'مشتریان', icon: 'mdi-account-group', color: 'primary', to: 'customers' },
  { key: 'stuff', title: 'کارمندان', icon: 'mdi-account-hard-hat', color: 'success', to: 'stuffs' },
  { key: 'product', title: 'محصولات', icon: 'mdi-package-variant', color: 'info', to: 'products' },
  { key: 'company', title: 'شرکت‌ها', icon: 'mdi-domain', color: 'warning', to: 'companies' },
]

const statCards = computed(() =>
  cardMeta.map(c => ({
    ...c,
    value: reports.value?.[c.key] ?? 0,
  })),
)

// 👉 Quick navigation shortcuts to the main modules
const quickLinks = [
  { title: 'روزنامچه', icon: 'mdi-notebook', color: '#0288D1', to: 'daily-reports' },
  { title: 'دریافت و پرداخت', icon: 'mdi-cash-sync', color: '#7B1FA2', to: 'transactions' },
  { title: 'معاملات روزانه', icon: 'mdi-cash', color: '#43A047', to: 'daily-transactions' },
  { title: 'مصارف روزانه', icon: 'mdi-cash-minus', color: '#C62828', to: 'daily-expense' },
  { title: 'حسابات بانکی', icon: 'mdi-bank', color: '#2E7D32', to: 'bank-accounts' },
  { title: 'ثبت ویزه', icon: 'mdi-passport', color: '#00695C', to: 'visa-registrations' },
  { title: 'حاضری کارمندان', icon: 'mdi-calendar-account', color: '#5E35B1', to: 'stuff-attendance' },
  { title: 'معاشات کارمندان', icon: 'mdi-cash-check', color: '#388E3C', to: 'stuff-payments' },
  { title: 'محصولات فروخته شده', icon: 'mdi-cart-arrow-right', color: '#C0CA33', to: 'product-sales' },
  { title: 'مواد خام', icon: 'mdi-cube-outline', color: '#546E7A', to: 'raw-materials' },
  { title: 'دارایی‌ها', icon: 'mdi-home-city', color: '#6D4C41', to: 'estates' },
  { title: 'پشتیبان گیری', icon: 'mdi-database-arrow-down', color: '#FB8C00', to: 'backup' },
]

const goTo = name => {
  router.push({ name })
}

const fetchData = async () => {
  try {
    loadingData.value = true
    const { data } = await axios.get('daily-reports')
    reports.value = data ?? {}
  } catch (error) {
    console.log('error while fetching the data', error)
  }
  loadingData.value = false
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped lang="scss">
.dashboard-hero {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: linear-gradient(135deg, #4338ca 0%, #6d28d9 50%, #9333ea 100%);

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 85% 20%, rgba(255, 255, 255, 0.18), transparent 45%);
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    padding: 28px;
  }
}

.stat-card,
.quick-link {
  cursor: pointer;
  border-radius: 14px;
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
  }
}

.quick-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

<route lang="yaml">
meta:
  auth: true
</route>
