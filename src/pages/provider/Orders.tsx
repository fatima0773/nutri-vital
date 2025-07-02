
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { formatPrice, formatDate } from '@/utils/helpers';
import { ORDER_STATUSES } from '@/utils/constants';
import { Order, OrderFilters } from '@/types/order';

const ITEMS_PER_PAGE = 10;

const ProviderOrders = () => {
  const { orders } = useOrders();
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<OrderFilters>({
    search: '',
    status: 'all',
    dateRange: { start: '', end: '' },
    sortBy: 'date-desc'
  });

  useEffect(() => {
    let filtered = [...orders];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.customer.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.customer.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.items.some(item => 
          item.product.name.toLowerCase().includes(filters.search.toLowerCase())
        )
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    // Date range filter
    if (filters.dateRange.start) {
      filtered = filtered.filter(order =>
        new Date(order.orderDate) >= new Date(filters.dateRange.start)
      );
    }
    if (filters.dateRange.end) {
      filtered = filtered.filter(order =>
        new Date(order.orderDate) <= new Date(filters.dateRange.end)
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-asc':
          return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
        case 'amount-desc':
          return b.totalAmount - a.totalAmount;
        case 'amount-asc':
          return a.totalAmount - b.totalAmount;
        default: // date-desc
          return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      }
    });

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [filters, orders]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
            Order Management
          </h1>
          <p className="text-gray-600 font-lato">
            View and manage all customer orders
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-raleway flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search orders..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Statuses</SelectItem>
                    {ORDER_STATUSES.map(status => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date From */}
              <div>
                <Input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value }
                  }))}
                  placeholder="From date"
                />
              </div>

              {/* Sort By */}
              <div>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value as OrderFilters['sortBy'] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="date-desc">Newest First</SelectItem>
                    <SelectItem value="date-asc">Oldest First</SelectItem>
                    <SelectItem value="amount-desc">Highest Amount</SelectItem>
                    <SelectItem value="amount-asc">Lowest Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-raleway">Orders</CardTitle>
              <p className="text-sm text-gray-600 font-lato">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredOrders.length)} of {filteredOrders.length} orders
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-poppins">Order ID</TableHead>
                    <TableHead className="font-poppins">Customer</TableHead>
                    <TableHead className="font-poppins">Date</TableHead>
                    <TableHead className="font-poppins">Items</TableHead>
                    <TableHead className="font-poppins">Status</TableHead>
                    <TableHead className="font-poppins">Total</TableHead>
                    <TableHead className="font-poppins">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Link 
                          to={`/provider/orders/${order.id}`}
                          className="font-poppins font-medium text-nutri-green-600 hover:text-nutri-green-700"
                        >
                          {order.id}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-lato font-medium">
                            {order.customer.firstName} {order.customer.lastName}
                          </p>
                          <p className="text-sm text-gray-500 font-lato">
                            {order.customer.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-lato">
                        {formatDate(order.orderDate)}
                      </TableCell>
                      <TableCell className="font-lato">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-raleway font-semibold">
                        {formatPrice(order.totalAmount)}
                      </TableCell>
                      <TableCell>
                        <Link to={`/provider/orders/${order.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 font-lato">No orders found matching your criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600 font-lato">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderOrders;
