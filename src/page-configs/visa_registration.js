const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'ثبت ویزای کشور ها',
    disabled: true,
    href: 'visa-registrations',
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
    title: 'شماره پاسپورت',
    key: 'passport_number',
  },
  {
    title: 'شماره تماس',
    key: 'phone_number',
  },
  {
    title: 'شهر / ولایت',
    key: 'city',
  },
  {
    title: 'نوع ویزا',
    key: 'visa_type',
  },
  {
    title: 'نوع سفر',
    key: 'travel_mode',
  },
  {
    title: 'وضعیت ویزا',
    key: 'visa_done_status',
  },
  {
    title: 'مدت ویزا',
    key: 'visa_period',
  },
  {
    title: 'واحد پول',
    key: 'currency',
  },
  {
    title: 'قیمت ویزا',
    key: 'visa_price',
  },
  {
    title: 'قیمت تکت طیاره',
    key: 'airplane_ticket_price',
  },
  {
    title: 'مقدار پرداخت شده',
    key: 'paid_amount',
  },
  {
    title: 'مقدار باقی مانده',
    key: 'remaining_amount',
  },
  {
    title: 'معرف',
    key: 'introducer',
  },
  {
    title: 'شماره تماس معرف',
    key: 'introducer_phone_number',
  },
  {
    title: 'تاریخ اخذ ویزا',
    key: 'visa_taken_date',
  },
  {
    title: 'آدرس در افغانستان',
    key: 'afg_full_address',
  },
  {
    title: 'آدرس در خارج',
    key: 'abroad_full_address',
  },
  {
    title: 'تاریخ',
    key: 'created_at',
  },
  {
    title: 'توضیحات',
    key: 'description',
  },
]

// 👉 Currency options (shared with the steper)
const currencies = [
  { title: 'دالر امریکایی', value: 'دالر امریکایی' },
  { title: 'دالر آسترالیایی', value: 'دالر آسترالیایی' },
  { title: 'افغانی', value: 'افغانی' },
  { title: 'یورو', value: 'یورو' },
]

// 👉 Visa type (matches the DB enum: کاری، سیاحتی، زیارتی، درمانی)
const visaTypes = [
  { title: 'کاری', value: 'کاری' },
  { title: 'سیاحتی', value: 'سیاحتی' },
  { title: 'زیارتی', value: 'زیارتی' },
  { title: 'درمانی', value: 'درمانی' },
]

// 👉 Travel mode (DB enum: land | air)
const travelModes = [
  { title: 'زمینی', value: 'land', color: 'info' },
  { title: 'هوایی', value: 'air', color: 'primary' },
]

// 👉 Visa status (DB enum: new | in_progress | done | cancelled)
const visaStatuses = [
  { title: 'جدید', value: 'new', color: 'info' },
  { title: 'در حال اجرا', value: 'in_progress', color: 'warning' },
  { title: 'اجرا شد', value: 'done', color: 'success' },
  { title: 'لغو شده', value: 'cancelled', color: 'error' },
]

export default function usePageConfig() {
  return {
    breadCrumbs,
    headers,
    currencies,
    visaTypes,
    travelModes,
    visaStatuses,
  }
}
