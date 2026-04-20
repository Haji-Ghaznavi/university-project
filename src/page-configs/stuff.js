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
    title: 'اسم',
    key: 'name',
  },
  {
    title: 'father name',
    key: 'father_name',
  },
  {
    title: 'last name',
    key: 'last_name',
  },
  {
    title: 'شماره تماس',
    key: 'phone_number',
  },
  {
    title: 'contract type',
    key: 'contract_type',
  },
  {
    title: 'start date',
    key: 'contract_start_date',
  },
  {
    title: 'end date',
    key: 'contract_end_date',
  },
  {
    title: 'salary',
    key: 'salary',
  },
  {
    title: 'currency',
    key: 'currency',
  },
  {
    title: 'profile',
    key: 'profile',
  },
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers,
  }
}
