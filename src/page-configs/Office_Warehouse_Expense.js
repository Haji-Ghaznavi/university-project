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
    title: 'نوع',
    key: 'type',
  },
  {
    title: 'مقدار',
    key: 'amount',
  },
  {
    title: 'واحد پولی',
    key: 'currency',
  },
  {
    title: 'تاریخ ',
    key: 'date',
  },
    {
    title: ' توضیحات',
    key: 'description',
  },

]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers
  }
}
