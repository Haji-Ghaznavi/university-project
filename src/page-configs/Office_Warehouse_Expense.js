const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'مصارف کارخانه',
    disabled: true,
    href: 'Office_Warehouse_Expense',
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
    title: 'نوع مصرف',
    key: 'type',
  },
  {
    title: 'پول مصرف شده',
    key: 'amount',
  },
  {
    title: 'واحد پول',
    key: 'currency',
  },
  {
    title: 'تاریخ ',
    key: 'date',
  },
  {
    title: 'توضیحات',
    key: 'description',
  },
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers,
  }
}
