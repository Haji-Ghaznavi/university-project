const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'حاضری کارمندان',
    disabled: true,
    href: 'stuff-attendance',
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
    title: 'کارمند',
    key: 'stuff',
  },
  {
    title: 'تاریخ',
    key: 'date',
  },
  {
    title: 'وضعیت',
    key: 'status',
  },
  {
    title: 'توضیحات',
    key: 'description',
  },
]

// 👉 Attendance statuses (DB enum: present | absent | leave | late)
const statusOptions = [
  { title: 'حاضر', value: 'present', color: 'success' },
  { title: 'غیر حاضر', value: 'absent', color: 'error' },
  { title: 'رخصتی', value: 'leave', color: 'info' },
  { title: 'تاخیر', value: 'late', color: 'warning' },
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers,
    statusOptions,
  }
}
