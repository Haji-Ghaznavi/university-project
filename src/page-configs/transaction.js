const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'دریافت و پرداخت',
    disabled: true,
    href: 'transactions',
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
    title: 'نوع داد و گرفت',
    key: 'transaction_type',
  },
  {
    title: 'مقدار',
    key: 'amount',
  },
  {
    title: 'واحد پول',
    key: 'currency',
  },
  {
    title: 'تاریخ',
    key: 'created_at',
  },
  {
    title: 'توضیحات',
    key: 'description',
  },
]

// 👉 Currency options (shared with the steper)
const currencies = [
  { title: 'دالر امریکایی', value: 'دالر امریکایی' },
  { title: 'دالر آسترالیایی', value: 'دالر آسترالیایی' },
  { title: 'افغانی', value: 'افغانی' },
  { title: 'یورو', value: 'یورو' },
]

// 👉 Transaction type (DB enum: paid | recieved)
const transactionTypes = [
  { title: 'پرداخت', value: 'paid', color: 'error' },
  { title: 'دریافت', value: 'recieved', color: 'success' },
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers,
    currencies,
    transactionTypes,
  }
}
