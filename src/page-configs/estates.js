const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'مخاطبین',
    disabled: true,
    href: 'contacts',
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
    title: 'نوع دارایی',
    key: 'estate_type',
  },
  {
    title: 'صاحب دارایی',
    key: 'estate_owner',
  },
  {
    title: 'قیمت',
    key: 'price',
  },
  {
    title: 'واحد پول',
    key: 'currency',
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
