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
    title: 'تخلص',
    key: 'last_name',
  },
  {
    title: 'شماره تماس',
    key: 'phone_number',
  },
  {
    title: 'نمبر تذکره',
    key: 'identity_card_number',
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
    title: 'ختم قرارداد',
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
   {
    title: 'مسوولیت',
    key: 'responsiblity',
  },
  {
    title: 'آدرس تکمیل',
    key: 'full_address',
  },
   {
    title: 'ضمانت',
    key: 'guarantee',
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
