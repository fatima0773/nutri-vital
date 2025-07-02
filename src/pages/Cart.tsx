
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/helpers';
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '@/utils/constants';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const shippingCost = cart.totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = cart.totalPrice + shippingCost;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-raleway font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 font-lato mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products">
              <Button size="lg" className="btn-primary">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-raleway font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600 font-lato">
            {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <Card key={item.product.id} className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full sm:w-24 h-32 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <Link 
                          to={`/products/${item.product.id}`}
                          className="text-lg font-raleway font-semibold text-gray-900 hover:text-nutri-green-600 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <Badge variant="outline" className="text-nutri-green-600 border-nutri-green-200 mt-1">
                          {item.product.category}
                        </Badge>
                      </div>
                      <div className="text-right mt-2 sm:mt-0">
                        <p className="text-xl font-raleway font-bold text-nutri-green-600">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <p className="text-sm text-gray-500 font-lato">
                          {formatPrice(item.product.price)} each
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 p-0 hover:bg-white"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-poppins font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-8 w-8 p-0 hover:bg-white"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-raleway">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-lato">Subtotal</span>
                  <span className="font-poppins font-medium">{formatPrice(cart.totalPrice)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-lato">Shipping</span>
                  <span className="font-poppins font-medium">
                    {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                  </span>
                </div>

                {cart.totalPrice < FREE_SHIPPING_THRESHOLD && (
                  <div className="text-sm text-nutri-green-600 font-lato bg-nutri-green-50 p-3 rounded-lg">
                    Add {formatPrice(FREE_SHIPPING_THRESHOLD - cart.totalPrice)} more for free shipping!
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg">
                  <span className="font-raleway font-semibold">Total</span>
                  <span className="font-raleway font-bold text-nutri-green-600">
                    {formatPrice(finalTotal)}
                  </span>
                </div>

                <div className="space-y-3 pt-4">
                  <Link to="/checkout" className="block">
                    <Button size="lg" className="w-full btn-primary text-lg">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  
                  <Link to="/products" className="block">
                    <Button variant="outline" size="lg" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-lato">Secure checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-lato">30-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-lato">Ships within 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
