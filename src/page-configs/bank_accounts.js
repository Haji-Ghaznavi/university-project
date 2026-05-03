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
    title: 'دارنده حساب',
    key: 'user_name',
  },
  {
    title: 'نام بانک',
    key: 'bank_name',
  },
  {
    title: 'شماره حساب ',
    key: 'account_number',
  },
  {
    title: 'واحد پول',
    key: 'currency',
  },
  {
    title: 'مقدار موجود',
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
  {
    title: 'مقدار برداشت ',
    key: 'taken_amount',
  },
  {
    title: 'تاریخ برداشت ',
    key: 'taken_date',
  },
  {
    title: 'مقدار اضافه شده ',
    key: 'added_amount',
  },
  {
    title: 'تاریخ اضافه شده ',
    key: 'added_date',
  },
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers,
  }
}
