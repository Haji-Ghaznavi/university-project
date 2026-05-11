const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'پرداخت معاشات کامندان',
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
    title: 'نام کارمند',
    key: 'stuff_id',
  },
  {
    title: 'مبلغ پرداخت شده',
    key: 'paid_amount',
  },
  {
    title: 'مبلغ باقی مانده',
    key: 'remaining_amount',
  },
  {
    title: 'تاریخ پرداخت',
    key: 'paid_date',
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
