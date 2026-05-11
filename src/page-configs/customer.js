const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'مشتریان',
    disabled: true,
    href: 'users',
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
    title: ' آدرس',
    key: 'address',
  },
   {
    title: 'کتگوری',
    key: 'category',
  },
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers
  }
}
