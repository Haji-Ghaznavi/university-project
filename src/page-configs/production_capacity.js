const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'ظرفیت تولید روزانه',
    disabled: true,
    href: 'production-capacities',
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
    title: 'نام محصول',
    key: 'product_id',
  },
  {
    title: 'مقدار',
    key: 'amount',
  },
  {
    title: 'واحد',
    key: 'unit',
  },
  {
    title: 'تاریخ',
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
