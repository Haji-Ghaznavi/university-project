const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'شرکت ها',
    disabled: true,
    href: 'bank-accounts',
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
    title: 'نام شرکت',
    key: 'name',
  },
  {
    title: "نام ریس شرکت",
    key: 'head_name',
  },
  {
    title: "تخلص ریس شرکت",
    key: 'head_last_name',
  },
  {
    title: "شماره تلفن ریس شرکت",
    key: 'head_phone_number',
  },

  {
    title: "نام معاون شرکت",
    key: 'assistant_name',
  },

  {
    title: "تخلص معاون شرکت",
    key: 'assistant_last_name',
  },

  {
    title: "شماره تلفن معاون شرکت",
    key: 'assistant_phone_number',
  },

  {
    title: 'تاریخ صادر جواز ',
    key: 'permission_produced_date',
  },
  {
    title: 'تاریخ ختم جواز ',
    key: 'permission_expired_date',
  },
  {
    title: 'مکان صدور جواز',
    key: 'permission_produced_place',
  },

  {
    title: 'ارگان صادرکننده جواز',
    key: 'permission_produced_company',
  },
   {
    title: 'مبلغ پرداخت',
    key: 'paid_amount',
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
