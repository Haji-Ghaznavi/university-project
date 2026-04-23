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
    title: 'مشتری',
    key: 'customer_name',
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
    title: 'واحد پولی',
    key: 'currency',
  },
  {
    title: ' نام دکان  ',
    key: 'shop_name',
  },
    {
    title: ' مقدار پرداخت شده ',
    key: 'paid_amount',
  },
    {
    title: ' مقدار باقی مانده ',
    key: 'remaining_amount',
  },
    {
    title: 'قیمت هر واحد',
    key: 'price_per_unit',
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
