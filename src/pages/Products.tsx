
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Star, Search, Filter, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/helpers';
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '@/utils/constants';
import productsData from '@/data/products.json';
import { Product, ProductFilters } from '@/types/product';

const Products = () => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const [products] = useState<Product[]>(productsData as Product[]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState<ProductFilters>({
    search: searchParams.get('search') || '',
    category: 'All',
    priceRange: [0, 100],
    bestSellers: false,
    sortBy: 'name'
  });

  const maxPrice = Math.max(...products.map(p => p.price));

  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setFilters(prev => ({ ...prev, search: searchParam }));
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Best sellers filter
    if (filters.bestSellers) {
      filtered = filtered.filter(product => product.bestSeller);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'best-sellers':
          if (a.bestSeller && !b.bestSeller) return -1;
          if (!a.bestSeller && b.bestSeller) return 1;
          return a.name.localeCompare(b.name);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      priceRange: [0, maxPrice],
      bestSellers: false,
      sortBy: 'name'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-raleway font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 font-lato">
            Discover our complete range of premium supplements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-nutri-green-600" />
                  <h3 className="font-raleway font-semibold text-lg">Filters</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <Label className="font-poppins font-medium">Search</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search products..."
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <Label className="font-poppins font-medium">Category</Label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {PRODUCT_CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="font-poppins font-medium">
                    Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </Label>
                  <div className="mt-4">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                      max={maxPrice}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Best Sellers */}
                <div className="flex items-center justify-between">
                  <Label className="font-poppins font-medium">Best Sellers Only</Label>
                  <Switch
                    checked={filters.bestSellers}
                    onCheckedChange={(checked) => setFilters(prev => ({ ...prev, bestSellers: checked }))}
                  />
                </div>

                {/* Sort By */}
                <div>
                  <Label className="font-poppins font-medium">Sort By</Label>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value as ProductFilters['sortBy'] }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {SORT_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 font-lato">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="card-product group">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-xl">
                      <Link to={`/products/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      {product.bestSeller && (
                        <Badge className="absolute top-3 left-3 bg-nutri-coral-400 text-white">
                          Best Seller
                        </Badge>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                          <Badge variant="secondary">Out of Stock</Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-nutri-green-600 border-nutri-green-200">
                          {product.category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-nutri-yellow-500 fill-current" />
                          <span className="text-sm font-poppins">{product.rating}</span>
                          <span className="text-xs text-gray-500">({product.reviewCount})</span>
                        </div>
                      </div>
                      
                      <Link to={`/products/${product.id}`}>
                        <CardTitle className="font-raleway text-lg group-hover:text-nutri-green-600 transition-colors line-clamp-2">
                          {product.name}
                        </CardTitle>
                      </Link>
                      
                      <CardDescription className="font-lato text-gray-600 line-clamp-2">
                        {product.description}
                      </CardDescription>
                      
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-2xl font-raleway font-bold text-nutri-green-600">
                          {formatPrice(product.price)}
                        </span>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                          size="sm"
                          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500 font-lato">No products found matching your criteria.</p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
