const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'اموال شرکت',
    disabled: true,
    href: 'CompanyTools',
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
    title: 'نام مال',
    key: 'name',
  },
  {
    title: 'تعداد مال',
    key: 'quantity',
  },
  {
    title: 'توضیحات',
    key: 'description',
  },

]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers
  }
}
