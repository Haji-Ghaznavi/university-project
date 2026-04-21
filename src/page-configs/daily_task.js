const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'وظایف روزانه',
    disabled: true,
    href: 'DailyTask',
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
    title: 'نام وظیفه',
    key: 'name',
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
