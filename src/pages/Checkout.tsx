
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Lock } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useOrders } from '@/hooks/useOrders';
import { formatPrice, generateOrderId } from '@/utils/helpers';
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD, EMAIL_REGEX, PHONE_REGEX, ZIP_REGEX } from '@/utils/constants';
import { Customer, Order } from '@/types/order';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shippingCost = cart.totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = cart.totalPrice + shippingCost;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!PHONE_REGEX.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!ZIP_REGEX.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const customer: Customer = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        }
      };

      const order: Order = {
        id: generateOrderId(),
        customer,
        items: cart.items,
        totalAmount: finalTotal,
        status: 'pending',
        orderDate: new Date().toISOString()
      };

      addOrder(order);
      clearCart();
      
      toast.success('Order placed successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-raleway font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 font-lato">
              Add some products to your cart before checkout.
            </p>
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
            Checkout
          </h1>
          <p className="text-gray-600 font-lato">
            Complete your order in just a few steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-raleway flex items-center">
                    <div className="w-8 h-8 bg-nutri-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-nutri-green-600 font-poppins font-semibold">1</span>
                    </div>
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="font-poppins">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="font-poppins">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="font-poppins">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="font-poppins">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={errors.phone ? 'border-red-500' : ''}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="street" className="font-poppins">Street Address *</Label>
                    <Input
                      id="street"
                      value={formData.street}
                      onChange={(e) => handleInputChange('street', e.target.value)}
                      className={errors.street ? 'border-red-500' : ''}
                    />
                    {errors.street && (
                      <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="font-poppins">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={errors.city ? 'border-red-500' : ''}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state" className="font-poppins">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={errors.state ? 'border-red-500' : ''}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="font-poppins">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className={errors.zipCode ? 'border-red-500' : ''}
                        placeholder="12345"
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-raleway flex items-center">
                    <div className="w-8 h-8 bg-nutri-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-nutri-green-600 font-poppins font-semibold">2</span>
                    </div>
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <Lock className="h-4 w-4" />
                    <AlertDescription className="font-lato">
                      This is a demo checkout. No actual payment will be processed.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-raleway">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between">
                      <div className="flex-1">
                        <p className="font-lato text-sm">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-poppins font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

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

                <Separator />

                <div className="flex justify-between text-lg">
                  <span className="font-raleway font-semibold">Total</span>
                  <span className="font-raleway font-bold text-nutri-green-600">
                    {formatPrice(finalTotal)}
                  </span>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  size="lg"
                  className="w-full btn-primary text-lg mt-6"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Place Order
                    </>
                  )}
                </Button>

                {/* Security Notice */}
                <div className="pt-4 border-t text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Lock className="h-4 w-4" />
                    <span className="font-lato">Secure SSL Encryption</span>
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

export default Checkout;
