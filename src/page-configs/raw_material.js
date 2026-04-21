const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'مواد خام',
    disabled: true,
    href: 'raw_materials',
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
    title: 'نام',
    key: 'name',
  },
  {
    title: 'مقدار',
    key: 'last_name',
  },
  {
    title: 'واحد',
    key: 'unit',
  },
  {
    title: 'قیمت هر واحد ',
    key: 'price_per_unit',
  },
    {
    title: 'واحد پول',
    key: 'currency',
  },
    {
    title: ' تاریخ  ',
    key: 'date',
  },
    {
    title: ' تفصیلات  ',
    key: 'description   ',
  },
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers
  }
}
