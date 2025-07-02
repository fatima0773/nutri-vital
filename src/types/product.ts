
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  bestSeller: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  certifications: string[];
  ingredients: string[];
  benefits: string[];
  servingSize: string;
  servingsPerContainer: number;
  tags: string[];
}

export interface ProductFilters {
  search: string;
  category: string;
  priceRange: [number, number];
  bestSellers: boolean;
  sortBy: 'name' | 'price-low' | 'price-high' | 'best-sellers';
}
