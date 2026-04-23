const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'مواد خام',
    disabled: true,
    href: 'raw_materials',
  },
]

const headers = [
  {
    title: 'آی دی',
    key: 'id',
  },
  {
    title: 'عملیات',
    key: 'actions',
  },
  {
    title: 'نام',
    key: 'name',
  },
  {
    title: 'مقدار',
    key: 'last_name',
  },
  {
    title: 'واحد',
    key: 'unit',
  },
  {
    title: 'قیمت هر واحد',
    key: 'price_per_unit',
  },
  {
    title: 'واحد پول',
    key: 'currency',
  },
  {
    title: 'نمبر بیل',
    key: 'bill_number',
  },
  {
    title: 'نام خریدار',
    key: 'buyer_name',
  },
  {
    title: 'نام فروشنده',
    key: 'sealer_name',
  },
  {
    title: 'شماره تماس فروشنده ',
    key: 'sealer_phone_number',
  },
  {
    title: 'نام شرکت',
    key: 'company_name',
  },
  {
    title: 'تاریخ',
    key: 'date',
  },
  {
    title: 'تفصیلات',
    key: 'description',
  },
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers,
  }
}
