const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'تامین کننده گان',
    disabled: true,
    href: 'investor',
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
    title: 'اسم',
    key: 'name',
  },
  {
    title: 'تخلص',
    key: 'last_name',
  },
  {
    title: 'شماره تماس',
    key: 'phone_number',
  },
  {
    title: 'آدرس',
    key: 'address',
  },
  {
    title: 'نوع معامله',
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
