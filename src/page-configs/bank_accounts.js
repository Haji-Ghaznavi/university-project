const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'حسابات بانکی',
    disabled: true,
    href: 'bank-accounts',
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
    key: 'name',
  },
  {
    title: 'واحد پولی',
    key: 'currency ',
  },
  {
    title: 'مقدار پول',
    key: 'amount',
  },

]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers
  }
}
