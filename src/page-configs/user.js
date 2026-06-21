const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'کاربران',
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
    title: 'پروفایل',
    key: 'profile',
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
    title: 'نقش',
    key: 'role',
  },
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers
  }
}
