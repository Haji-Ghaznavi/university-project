const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'مخاطبین',
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
    title: 'نام',
    key: 'name',
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
    title: 'آدرس',
    key: 'address',
  },
    {
    title: 'مقام',
    key: 'position',
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
