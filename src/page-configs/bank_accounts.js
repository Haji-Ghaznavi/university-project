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
    title: 'کاربر ',
    key: 'user_name',
  },
  {
    title: 'نام حساب',
    key: 'name',
  },
    {
    title: 'شماره حساب ',
    key: 'account_number',
  },
  {
    title: 'واحد پولی',
    key: 'currency ',
  },
  {
    title: 'مقدار پول',
    key: 'amount',
  },
    {
    title: 'تاریخ صادر کارت ',
    key: 'produced_date',
  },
    {
    title: 'تاریخ ختم کارت ',
    key: 'expired_date',
  },

]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers
  }
}
