const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'محصولات',
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
    title: 'نام محصول',
    key: 'name',
  }
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers
  }
}
