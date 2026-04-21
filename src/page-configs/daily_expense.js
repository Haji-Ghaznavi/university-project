const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'مصارف روزانه',
    disabled: true,
    href: 'DailyExpense',
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
    title: 'مقدار مصرف',
    key: 'amount',
  },
  {
    title: 'واحد پولی',
    key: 'currency',
  },
  {
    title: ' تاریخ',
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
