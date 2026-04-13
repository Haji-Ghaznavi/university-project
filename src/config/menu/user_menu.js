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
    title: 'اسم',
    key: 'name',
  },
  {
    title: 'تخلص',
    key: 'last_name',
  },
  {
    title: 'ایمیل',
    key: 'email',
  },
  {
    title: 'شماره تماس',
    key: 'phone_number',
  },
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers
  }
}
