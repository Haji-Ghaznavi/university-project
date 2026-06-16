<script setup>
import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png'
import logo from '@/assets/logo.svg?raw'

import { VerticalNavLink } from '@layouts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header ps-1 d-flex align-center">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <!-- ℹ️ You can also use img tag or VImg here -->
      <div
        class="d-flex"
        v-html="logo"
      />

      <Transition name="vertical-nav-app-title">
        <h1
          class="font-weight-semibold leading-normal text-xl text-uppercase"
          style="color: #ddd942"
        >
          Ahmad Shah
        </h1>
      </Transition>
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>
    <VerticalNavLink
      :item="{
        title: 'داشبورد',
        to: 'index',
        icon: { icon: 'mdi-home-outline' },
      }"
    />
     <VerticalNavLink
      :item="{
        title: 'روزنامچه',
        to: 'daily-reports',
        icon: { icon: 'mdi-notebook' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'کاربران',
        to: 'users',
        icon: { icon: 'mdi-account-details' },
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'کارمندان',
        to: 'stuffs',
        icon: { icon: 'mdi-account-multiple' },
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'حاضری کارمندان',
        to: 'stuff-attendance',
        icon: { icon: 'mdi-calendar-account' },
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'مشتریان',
        to: 'customers',
        icon: { icon: 'mdi-account-multiple-outline' },
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'محصولات',
        to: 'products',
        icon: { icon: 'mdi-cart-outline' },
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'محصولات فروخته شده',
        to: 'product-sales',
        icon: { icon: 'mdi-cart-outline' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'مواد خام خریداری شده ',
        to: 'raw-materials',
        icon: { icon: 'mdi-material' },
      }"
    />
     <VerticalNavLink
      :item="{
        title: 'مواد خام باقی مانده',
        to: 'remaining-raw-material',
        icon: { icon: 'mdi-material' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'تامین کننده گان شرکت',
        to: 'investors',
        icon: { icon: 'mdi-company' },
      }"
    />
     <VerticalNavLink
      :item="{
        title: 'پراخت معاشات کارمندان',
        to: 'stuff-payments',
        icon: { icon: 'mdi-account-multiple-outline' },
      }"
    />
     <VerticalNavLink
      :item="{
        title: 'گزارشات شرکت',
        to: 'company-reports',
        icon: { icon: 'mdi-company' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'ظرفیت تولید روزانه',
        to: 'production-capacities',
        icon: { icon: 'mdi-cube-outline' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'معاملات روزانه',
        to: 'daily-transactions',
        icon: { icon: 'mdi-cash' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'دارایی ها',
        to: 'estates',
        icon: { icon: 'mdi-home-outline' },
      }"
    />
     <VerticalNavLink
      :item="{
        title: 'شرکت ها',
        to: 'companies',
        icon: { icon: 'mdi-company' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'مصارف کارخانه و دفتر',
        to: 'office-warehouse-expense',
        icon: { icon: 'mdi-factory' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'مصارف روزانه',
        to: 'daily-expense',
        icon: { icon: 'mdi-cash-minus' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'اموال شرکت',
        to: 'company-tools',
        icon: { icon: 'mdi-package-variant' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'حسابات بانکی',
        to: 'bank-accounts',
        icon: { icon: 'mdi-credit-card-outline' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'اموال شخصی',
        to: 'personal-goods',
        icon: { icon: 'mdi-package-variant' },
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'پسورد ها',
        to: 'passwords',
        icon: { icon: 'mdi-lock-outline' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'وظایف روزانه',
        to: 'daily-tasks',
        icon: { icon: 'mdi-calendar-check' },
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'مخاطبین ',
        to: 'contacts',
        icon: { icon: 'mdi-contact' },
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'ثبت ویزای کشور ها',
        to: 'visa-registrations',
        icon: { icon: 'mdi-passport' },
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'دریافت و پرداخت',
        to: 'transactions',
        icon: { icon: 'mdi-cash-sync' },
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'توسعه دهندگان',
        to: 'developers',
        icon: { icon: 'mdi-account-multiple-outline' },
      }"
    />

      <!-- <VerticalNavLink
      :item="{
        title: 'توسعه دهندگان',
        to: 'developers',
        icon: { icon: 'mdi-account-multiple-outline' },
      }"
    /> -->

    <!-- <VerticalNavLink
      :item="{
        title: 'تنظیمات حساب',
        to: 'account-settings',
        icon: { icon: 'mdi-account-cog-outline' },
      }"
    /> -->

    <!-- 👉 Pages -->
    <!-- <template
      v-for="menu in menus"
      :key="menu"
    >
      <VerticalNavSectionTitle
        v-if="menu.heading"
        :item="menu"
      />
      <VerticalNavLink
        v-if="menu.title"
        :item="menu"
      />
    </template> -->

    <!--
      <VerticalNavLink :item="{
      title: 'Typography',
      to: 'typography',
      icon: { icon: 'mdi-alpha-t-box-outline' }
      }" />
      <VerticalNavLink :item="{
      title: 'Icons',
      to: 'icons',
      icon: { icon: 'mdi-eye-outline' }
      }" />
      <VerticalNavLink :item="{
      title: 'Cards',
      to: 'card-basic',
      icon: { icon: 'mdi-credit-card-outline' }
      }" />
      <VerticalNavLink :item="{
      title: 'Tables',
      to: 'tables',
      icon: { icon: 'mdi-table' }
      }" />
      <VerticalNavLink :item="{
      title: 'Form Layouts',
      to: 'form-layouts',
      icon: { icon: 'mdi-form-select' }
      }" /> 
    -->

    <!-- 👉 User Interface -->
  </ul>
</template>

<style lang="scss">
.v-navigation-drawer {
  height: 100%;

  .v-navigation-drawer__content {
    display: flex;
    flex-direction: column;

    > ul {
      flex-grow: 1;
    }
  }
}

.upgrade-banner {
  margin-top: auto;
  // position: absolute;
  // bottom: 13px;
  // left: 50%;
  // transform: translateX(-50%);
}
</style>
