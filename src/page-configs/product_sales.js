const breadCrumbs = [
  {
    title: 'داشبورد',
    disabled: false,
    href: '/',
  },
  {
    title: 'محصولات فروخته شده',
    disabled: true,
    href: 'product-sales',
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
    title: 'اسم مشتری',
    key: 'customer_id',
  },
  {
    title: 'محصول',
    key: 'product_id',
  },
  {
    title: 'تعداد',
    key: 'quantity',
  },
  {
    title: 'واحد اندازه گیری',
    key: 'unit',
  },
  {
    title: 'واحد پول',
    key: 'currency',
  },
  {
    title: 'نام دوکان',
    key: 'shop_name',
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
    title: 'قیمت هر واحد',
    key: 'price_per_unit',
  },
  {
    title: 'قیمت به افغانی',
    key: 'price_in_afg',
  },
  {
    title: 'تاریخ',
    key: 'date',
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
