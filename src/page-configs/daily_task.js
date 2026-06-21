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
  {
    title: 'وضعیت',
    key: 'status',
  },


]

// 👉 The three task statuses (value goes to the API, title is shown to the user)
const statusOptions = [
  {
    title: 'جدید',
    value: 'new',
    color: 'info',
  },
  {
    title: 'در حال اجرا',
    value: 'in_progress',
    color: 'warning',
  },
  {
    title: 'اجرا شد',
    value: 'done',
    color: 'success',
  },
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers,
    statusOptions,
  }
}
