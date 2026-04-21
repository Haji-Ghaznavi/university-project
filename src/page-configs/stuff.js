const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'کارمندان',
    disabled: true,
    href: 'stuffs',
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
    title: 'نام',
    key: 'name',
  },
  {
    title: 'نام پدر',
    key: 'father_name',
  },
  {
    title: 'تخلص ',
    key: 'last_name',
  },
  {
    title: ' شماره تماس',
    key: 'phone_number',
  },
  {
    title: 'نوع قرارداد ',
    key: 'contract_type',
  },
  {
    title: 'شروع قرارداد',
    key: 'contract_start_date',
  },
  {
    title: ' ختم قرارداد',
    key: 'contract_end_date',
  },
  {
    title: 'معاش',
    key: 'salary',
  },
  {
    title: 'واحد پول',
    key: 'currency',
  },
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers,
  }
}
