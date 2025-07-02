
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Shield, Award, Truck, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/helpers';
import { toast } from 'sonner';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = (productsData as Product[]).find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-raleway font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm font-lato text-gray-600 mb-6">
          <Link to="/products" className="hover:text-nutri-green-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl bg-white">
              <img
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-nutri-green-400' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <Badge variant="outline" className="text-nutri-green-600 border-nutri-green-200">
                  {product.category}
                </Badge>
                {product.bestSeller && (
                  <Badge className="bg-nutri-coral-400 text-white">
                    Best Seller
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-raleway font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-nutri-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-poppins text-lg">{product.rating}</span>
                <span className="text-gray-500 font-lato">({product.reviewCount} reviews)</span>
              </div>
              
              <p className="text-xl text-gray-600 font-lato leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price and Add to Cart */}
            <Card className="p-6 bg-gradient-to-r from-nutri-green-50 to-nutri-lime-50 border-nutri-green-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-4xl font-raleway font-bold text-nutri-green-600">
                    {formatPrice(product.price)}
                  </span>
                  <p className="text-sm text-gray-600 font-lato">
                    {product.servingSize} • {product.servingsPerContainer} servings
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-green-600 mb-1">
                    <Check className="h-4 w-4" />
                    <span className="text-sm font-poppins">In Stock</span>
                  </div>
                  <p className="text-xs text-gray-500">Free shipping over $75</p>
                </div>
              </div>
              
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full btn-primary text-lg"
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
            </Card>

            {/* Certifications */}
            <div className="flex flex-wrap gap-3">
              {product.certifications.map((cert) => (
                <div key={cert} className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border">
                  <Shield className="h-4 w-4 text-nutri-green-500" />
                  <span className="text-sm font-poppins text-gray-700">{cert}</span>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, text: "Third-Party Tested" },
                { icon: Award, text: "GMP Certified" },
                { icon: Truck, text: "Fast Shipping" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <item.icon className="h-6 w-6 text-nutri-green-500 mx-auto mb-2" />
                  <p className="text-xs font-poppins text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="description" className="font-poppins">Description</TabsTrigger>
              <TabsTrigger value="ingredients" className="font-poppins">Ingredients</TabsTrigger>
              <TabsTrigger value="benefits" className="font-poppins">Benefits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <Card className="p-8">
                <h3 className="text-2xl font-raleway font-bold mb-4">Product Description</h3>
                <p className="text-gray-700 font-lato leading-relaxed text-lg">
                  {product.longDescription}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-poppins font-semibold text-nutri-green-600 mb-2">Serving Size</h4>
                    <p className="font-lato">{product.servingSize}</p>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-nutri-green-600 mb-2">Servings Per Container</h4>
                    <p className="font-lato">{product.servingsPerContainer}</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="ingredients" className="mt-8">
              <Card className="p-8">
                <h3 className="text-2xl font-raleway font-bold mb-4">Ingredients</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-nutri-green-500" />
                      <span className="font-lato">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="benefits" className="mt-8">
              <Card className="p-8">
                <h3 className="text-2xl font-raleway font-bold mb-4">Key Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-nutri-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-nutri-green-600" />
                      </div>
                      <span className="font-lato">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
