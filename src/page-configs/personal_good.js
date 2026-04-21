const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'اموال شخصی',
    disabled: true,
    href: 'PersonalGoods',
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
    title: 'نام مال شخصی',
    key: 'name',
  },
  {
    title: 'تعداد',
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
