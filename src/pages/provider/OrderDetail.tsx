
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Package, User, MapPin, CreditCard, Calendar } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { formatPrice, formatDate } from '@/utils/helpers';
import { ORDER_STATUSES } from '@/utils/constants';
import { toast } from 'sonner';

const ProviderOrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById, updateOrderStatus } = useOrders();
  
  const order = getOrderById(id!);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-raleway font-bold text-gray-900 mb-4">
              Order Not Found
            </h1>
            <Link to="/provider/orders">
              <Button>Back to Orders</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = (newStatus: string) => {
    updateOrderStatus(order.id, newStatus as any);
    toast.success(`Order status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/provider/orders">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-raleway font-bold text-gray-900">
              Order {order.id}
            </h1>
            <p className="text-gray-600 font-lato">
              Placed on {formatDate(order.orderDate)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-raleway flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Order Items
                </CardTitle>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-raleway font-semibold text-gray-900">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-gray-600 font-lato">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600 font-lato">
                          Unit Price: {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-raleway font-semibold text-gray-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-lato">Subtotal:</span>
                    <span className="font-poppins font-medium">
                      {formatPrice(order.totalAmount - 9.99)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-lato">Shipping:</span>
                    <span className="font-poppins font-medium">
                      {formatPrice(9.99)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-raleway font-semibold">Total:</span>
                    <span className="font-raleway font-bold text-nutri-green-600">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-raleway flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-poppins font-semibold text-gray-900 mb-3">Contact Details</h4>
                    <div className="space-y-2">
                      <p className="font-lato">
                        <span className="text-gray-600">Name:</span>{' '}
                        {order.customer.firstName} {order.customer.lastName}
                      </p>
                      <p className="font-lato">
                        <span className="text-gray-600">Email:</span>{' '}
                        {order.customer.email}
                      </p>
                      <p className="font-lato">
                        <span className="text-gray-600">Phone:</span>{' '}
                        {order.customer.phone}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-gray-900 mb-3 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Shipping Address
                    </h4>
                    <div className="text-gray-700 font-lato">
                      <p>{order.customer.address.street}</p>
                      <p>
                        {order.customer.address.city}, {order.customer.address.state} {order.customer.address.zipCode}
                      </p>
                      <p>{order.customer.address.country}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Management */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Management */}
            <Card>
              <CardHeader>
                <CardTitle className="font-raleway">Order Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-poppins text-gray-600 mb-2">Current Status:</p>
                  <Badge className={getStatusColor(order.status)} variant="secondary">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-poppins text-gray-600 mb-2">Update Status:</p>
                  <Select onValueChange={handleStatusUpdate} defaultValue={order.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {ORDER_STATUSES.map(status => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {order.trackingNumber && (
                  <div>
                    <p className="text-sm font-poppins text-gray-600 mb-1">Tracking Number:</p>
                    <p className="font-lato font-medium">{order.trackingNumber}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="font-raleway flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-poppins font-medium">Order Placed</p>
                    <p className="text-sm text-gray-600 font-lato">
                      {formatDate(order.orderDate)}
                    </p>
                  </div>
                </div>

                {order.shippingDate && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-poppins font-medium">Order Shipped</p>
                      <p className="text-sm text-gray-600 font-lato">
                        {formatDate(order.shippingDate)}
                      </p>
                    </div>
                  </div>
                )}

                {order.deliveryDate && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-poppins font-medium">Order Delivered</p>
                      <p className="text-sm text-gray-600 font-lato">
                        {formatDate(order.deliveryDate)}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-raleway">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full btn-primary">
                  Send Update Email
                </Button>
                <Button variant="outline" className="w-full">
                  Print Order
                </Button>
                <Button variant="outline" className="w-full">
                  Download Invoice
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderOrderDetail;
