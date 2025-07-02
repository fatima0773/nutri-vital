import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, Shield, Truck, Award, ArrowRight, Leaf } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/helpers';
import productsData from '@/data/products.json';
import faqData from '@/data/faq.json';
import { Product } from '@/types/product';

const Index = () => {
  const { addToCart } = useCart();
  const location = useLocation();
  const products = productsData as Product[];
  const bestSellers = products.filter(product => product.bestSeller).slice(0, 4);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  // Handle navigation to FAQ section from other pages
  useEffect(() => {
    if (location.hash === '#faq') {
      setTimeout(() => {
        const faqSection = document.getElementById('faq');
        if (faqSection) {
          faqSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-nutri-green-50 via-nutri-lime-50 to-nutri-yellow-50 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-natural opacity-5"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-nutri-green-200 rounded-full opacity-20 animate-pulse-gentle"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-nutri-yellow-200 rounded-full opacity-20 animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-nutri-lime-200 rounded-full opacity-15 animate-pulse-gentle" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="space-y-6">
              <Badge className="bg-nutri-green-100 text-nutri-green-700 hover:bg-nutri-green-200 font-poppins text-lg px-6 py-2">
                Premium Quality Supplements
              </Badge>
              
              <h1 className="text-6xl lg:text-7xl font-raleway font-bold text-gray-900 leading-tight">
                Wellness
                <span className="text-gradient block">Redefined</span>
              </h1>
              
              <p className="text-2xl text-gray-600 font-lato leading-relaxed max-w-3xl mx-auto">
                Discover premium supplements crafted with the finest ingredients. 
                Every product is third-party tested, certified, and designed for your optimal health journey.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/products">
                <Button size="lg" className="btn-primary text-xl px-10 py-4">
                  Shop Now <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-xl px-10 py-4 border-nutri-green-300 text-nutri-green-700 hover:bg-nutri-green-50">
                Learn More
              </Button>
            </div>

            {/* Rating Display */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg inline-block">
              <div className="flex items-center justify-center space-x-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-nutri-yellow-500 fill-current" />
                  ))}
                </div>
                <span className="text-2xl font-raleway font-bold text-gray-900">4.8/5</span>
                <span className="text-gray-600 font-lato text-lg">from 1000+ Reviews</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full">
                <Shield className="h-6 w-6 text-nutri-green-500" />
                <span className="font-poppins text-gray-700 font-medium">Third-Party Tested</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full">
                <Award className="h-6 w-6 text-nutri-green-500" />
                <span className="font-poppins text-gray-700 font-medium">GMP Certified</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full">
                <Leaf className="h-6 w-6 text-nutri-green-500" />
                <span className="font-poppins text-gray-700 font-medium">Non-GMO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-nutri-yellow-100 text-nutri-yellow-700 hover:bg-nutri-yellow-200 font-poppins mb-4">
              Customer Favorites
            </Badge>
            <h2 className="text-4xl font-raleway font-bold text-gray-900 mb-4">
              Best Selling Products
            </h2>
            <p className="text-xl text-gray-600 font-lato max-w-2xl mx-auto">
              Our most popular supplements, trusted by thousands of health-conscious customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product, index) => (
              <Card key={product.id} className="card-product group" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-nutri-coral-400 text-white">
                      Best Seller
                    </Badge>
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
                      </div>
                    </div>
                    
                    <CardTitle className="font-raleway text-lg group-hover:text-nutri-green-600 transition-colors">
                      {product.name}
                    </CardTitle>
                    
                    <CardDescription className="font-lato text-gray-600 line-clamp-2">
                      {product.description}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-2xl font-raleway font-bold text-nutri-green-600">
                        {formatPrice(product.price)}
                      </span>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        size="sm"
                        className="btn-primary"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-nutri-green-300 text-nutri-green-700 hover:bg-nutri-green-50">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-raleway font-bold text-gray-900 mb-4">
              Why Choose NutriVital?
            </h2>
            <p className="text-xl text-gray-600 font-lato max-w-2xl mx-auto">
              We're committed to delivering the highest quality supplements with complete transparency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Third-Party Tested",
                description: "Every product undergoes rigorous testing for purity, potency, and safety by independent laboratories."
              },
              {
                icon: Award,
                title: "Premium Quality",
                description: "We source only the finest ingredients from trusted suppliers, ensuring bioavailability and effectiveness."
              },
              {
                icon: Truck,
                title: "Fast & Free Shipping",
                description: "Free shipping on orders over $75. Most orders ship within 24 hours with tracking included."
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-natural rounded-full flex items-center justify-center mx-auto">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="font-raleway text-xl">{feature.title}</CardTitle>
                  <CardDescription className="font-lato text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-raleway font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 font-lato max-w-2xl mx-auto">
              Get answers to common questions about our products and services
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="font-raleway font-semibold text-left hover:text-nutri-green-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-lato text-gray-600 pt-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-natural">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-raleway font-bold text-white">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-xl text-white/90 font-lato">
              Join thousands of satisfied customers who trust NutriVital for their daily nutrition needs
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-white text-nutri-green-600 hover:bg-gray-100 text-lg px-8">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
