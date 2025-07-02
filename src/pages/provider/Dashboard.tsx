
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, DollarSign, TrendingUp, Users, ArrowRight, Clock } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { formatPrice, formatDate } from '@/utils/helpers';

const ProviderDashboard = () => {
  const { orders } = useOrders();

  // Calculate stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const recentOrders = orders.slice(0, 5);

  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      icon: Package,
      description: 'All time orders',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Revenue',
      value: formatPrice(totalRevenue),
      icon: DollarSign,
      description: 'All time revenue',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Orders',
      value: pendingOrders.toString(),
      icon: Clock,
      description: 'Awaiting processing',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Growth Rate',
      value: '+12.5%',
      icon: TrendingUp,
      description: 'From last month',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

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
        <div className="mb-8">
          <h1 className="text-3xl font-raleway font-bold text-gray-900 mb-2">
            Provider Dashboard
          </h1>
          <p className="text-gray-600 font-lato">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-poppins text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-raleway font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 font-lato mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-raleway">Recent Orders</CardTitle>
                <CardDescription className="font-lato">
                  Latest customer orders
                </CardDescription>
              </div>
              <Link to="/provider/orders">
                <Button variant="outline" size="sm">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Link 
                            to={`/provider/orders/${order.id}`}
                            className="font-poppins font-medium text-gray-900 hover:text-nutri-green-600"
                          >
                            {order.id}
                          </Link>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 font-lato">
                          {order.customer.firstName} {order.customer.lastName}
                        </p>
                        <p className="text-xs text-gray-500 font-lato">
                          {formatDate(order.orderDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-raleway font-semibold text-gray-900">
                          {formatPrice(order.totalAmount)}
                        </p>
                        <p className="text-xs text-gray-500 font-lato">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-lato">No recent orders</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-raleway">Quick Actions</CardTitle>
              <CardDescription className="font-lato">
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/provider/orders" className="block">
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-nutri-green-100 rounded-lg flex items-center justify-center">
                    <Package className="h-5 w-5 text-nutri-green-600" />
                  </div>
                  <div>
                    <p className="font-poppins font-medium text-gray-900">View All Orders</p>
                    <p className="text-sm text-gray-600 font-lato">Manage customer orders</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                </div>
              </Link>

              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer opacity-50">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-poppins font-medium text-gray-900">Customer Management</p>
                  <p className="text-sm text-gray-600 font-lato">Coming soon</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer opacity-50">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-poppins font-medium text-gray-900">Analytics & Reports</p>
                  <p className="text-sm text-gray-600 font-lato">Coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
