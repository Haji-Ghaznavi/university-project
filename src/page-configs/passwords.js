const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'پسورد ها',
    disabled: true,
    href: 'Passwords',
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
    title: 'نام حساب',
    key: 'account_name',
  },
  {
    title: 'شماره تلفن',
    key: 'phone_number',
  },
  {
    title: 'پسورد',
    key: 'password',
  },
  {
    title: 'توضیحات ',
    key: 'description',
  },
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers
  }
}
