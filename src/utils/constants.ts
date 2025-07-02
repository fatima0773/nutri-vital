
export const PRODUCT_CATEGORIES = [
  'All',
  'Vitamins',
  'Minerals',
  'Protein',
  'Supplements'
];

export const ORDER_STATUSES = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
] as const;

export const SORT_OPTIONS = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'price-low', label: 'Price (Low to High)' },
  { value: 'price-high', label: 'Price (High to Low)' },
  { value: 'best-sellers', label: 'Best Sellers First' }
];

export const SHIPPING_COST = 9.99;
export const FREE_SHIPPING_THRESHOLD = 75;

export const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const ZIP_REGEX = /^\d{5}(-\d{4})?$/;
