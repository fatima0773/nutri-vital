
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProviderLoginOpen, setIsProviderLoginOpen] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const handleProviderLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'password') {
      navigate('/provider');
      setIsProviderLoginOpen(false);
    } else {
      alert('Invalid credentials. Use admin/password');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      const faqSection = document.getElementById('faq');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const faqSection = document.getElementById('faq');
        if (faqSection) {
          faqSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const isStorefront = !location.pathname.startsWith('/provider');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/lovable-uploads/4c9c2cdb-d1db-4a51-aff2-8867c07ba092.png" 
              alt="NutriVital Logo" 
              className="h-20 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isStorefront ? (
              <>
                <Link 
                  to="/" 
                  className={`text-gray-700 hover:text-nutri-green-500 font-lato font-medium transition-colors duration-200 ${
                    location.pathname === '/' ? 'text-nutri-green-500 font-semibold' : ''
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/products" 
                  className={`text-gray-700 hover:text-nutri-green-500 font-lato font-medium transition-colors duration-200 ${
                    location.pathname === '/products' ? 'text-nutri-green-500 font-semibold' : ''
                  }`}
                >
                  Products
                </Link>
                <button 
                  onClick={handleFAQClick}
                  className="text-gray-700 hover:text-nutri-green-500 font-lato font-medium transition-colors duration-200"
                >
                  FAQ
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/provider" 
                  className={`text-gray-700 hover:text-nutri-green-500 font-lato font-medium transition-colors duration-200 ${
                    location.pathname === '/provider' ? 'text-nutri-green-500 font-semibold' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/provider/orders" 
                  className={`text-gray-700 hover:text-nutri-green-500 font-lato font-medium transition-colors duration-200 ${
                    location.pathname === '/provider/orders' ? 'text-nutri-green-500 font-semibold' : ''
                  }`}
                >
                  Orders
                </Link>
              </>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {isStorefront && (
              <>
                {/* Search */}
                <div className="hidden sm:block">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      className="pl-10 w-64 focus:ring-nutri-green-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </div>

                {/* Cart */}
                <Link to="/cart" className="relative group">
                  <Button variant="ghost" size="sm" className="hover:bg-nutri-green-50">
                    <ShoppingCart className="h-5 w-5" />
                    {cart.totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-nutri-coral-400 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center">
                        {cart.totalItems}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </>
            )}

            {/* Provider Login */}
            <Dialog open={isProviderLoginOpen} onOpenChange={setIsProviderLoginOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Provider</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Provider Login</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleProviderLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="admin"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="password"
                    />
                  </div>
                  <Button type="submit" className="w-full btn-primary">
                    Login
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {isStorefront ? (
                <>
                  <Link 
                    to="/" 
                    className={`text-gray-700 hover:text-nutri-green-500 font-lato font-medium transition-colors duration-200 ${
                      location.pathname === '/' ? 'text-nutri-green-500 font-semibold' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/products" 
                    className={`text-gray-700 hover:text-nutri-green-500 font-lato font-medium transition-colors duration-200 ${
                      location.pathname === '/products' ? 'text-nutri-green-500 font-semibold' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <button 
                    onClick={handleFAQClick}
                    className="text-gray-700 hover:text-nutri-green-500 font-lato font-medium transition-colors duration-200 text-left"
                  >
                    FAQ
                  </button>
                  <div className="pt-2">
                    <form onSubmit={handleSearch}>
                      <Input
                        type="text"
                        placeholder="Search products..."
                        className="w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/provider" 
                    className={`text-gray-700 hover:text-nutri-green-500 font-lato font-medium transition-colors duration-200 ${
                      location.pathname === '/provider' ? 'text-nutri-green-500 font-semibold' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/provider/orders" 
                    className={`text-gray-700 hover:text-nutri-green-500 font-lato font-medium transition-colors duration-200 ${
                      location.pathname === '/provider/orders' ? 'text-nutri-green-500 font-semibold' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
