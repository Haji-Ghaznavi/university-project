const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'گزارشات شرکت',
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
    title: 'نام شرکت',
    key: 'company_id',
  },
  {
    title: 'ربع',
    key: 'report_type',
  },
  {
    title: 'نوع فعالیت',
    key: 'activity_type',
  },
  {
    title: 'مبلغ پرداخت شده',
    key: 'amount',
  },
 {
    title: 'تاریخ پرداخت',
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
