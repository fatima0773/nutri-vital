# NutriVital - Premium Supplement Store

A modern e-commerce platform for premium supplements, featuring a dual-interface system with customer storefront and admin provider portal.

## 🌿 Project Overview

NutriVital is a comprehensive e-commerce solution built for health-conscious consumers who value transparency, quality certifications, and detailed product information. The platform combines a modern customer shopping experience with a robust backend order management system.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Fonts**: Raleway (Headlines), Lato (Body), Poppins (Accent/Labels)

## 🎨 Design System

### Color Palette
- Primary Green: `#aad07f` or `#708A58`
- Accent Green: `#e0f280`
- Warm Yellow: `#f4e68e` or `#FFB823`
- Orange: `#FF8C42`
- Coral: `#FF6B6B`
- Base: White

### Design Philosophy
- Natural elements with lots of leaves and greens
- Earthy tones throughout
- Modern & clean contemporary design
- High-quality product photography
- Prominent certifications and trust badges
- Smooth animations and hover transitions

### Responsive Breakpoints
```css
@media (min-width: 320px) { /* Mobile Small */ }
@media (min-width: 375px) { /* Mobile */ }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1200px) { /* Large Desktop */ }
@media (min-width: 1440px) { /* XL Desktop */ }
```

## 📁 Project Structure

```
src/
├── app/
│   ├── storefront/                 # Customer-facing pages
│   │   ├── page.tsx               # Homepage
│   │   ├── products/
│   │   │   ├── page.tsx           # Product catalog
│   │   │   └── [id]/page.tsx      # Product details
│   │   ├── cart/
│   │   │   └── page.tsx           # Shopping cart
│   │   └── checkout/
│   │       └── page.tsx           # Checkout process
│   └── provider/                   # Admin portal
│       ├── layout.tsx
│       ├── orders/
│       │   ├── page.tsx           # Orders list
│       │   └── [id]/page.tsx      # Order details
├── components/
│   ├── ui/                        # shadcn components
│   └── layout/                    # Header, Footer
├── context/
│   ├── CartContext.tsx            # Cart state management
│   └── OrderContext.tsx           # Order state management
├── hooks/
│   ├── useCart.ts                 # Cart operations
│   └── useOrder.ts                # Order management
├── data/
│   ├── products.json              # Product catalog
│   ├── orders.json                # Order history
│   └── faq.json                   # FAQ content
├── types/
│   ├── product.ts                 # Product interfaces
│   ├── order.ts                   # Order interfaces
│   ├── cart.ts                    # Cart interfaces
│   └── customer.ts                # Customer interfaces
├── utils/                         # Utility functions
└── constants/                     # App constants
```

## ✨ Features

### 🛍️ Customer Storefront

#### Homepage
- Hero section with natural elements and earthy tones
- Best-selling products carousel
- Expandable FAQ section

#### Product Catalog
- Grid layout for product display
- **Filtering**: Category, price range, best sellers
- **Search**: Product name and description search
- **Sorting**: Price (high/low), alphabetical, best sellers priority

#### Product Experience
- Dynamic routing for individual product pages (`/products/[id]`)
- Comprehensive product details
- Add to cart functionality with quantity management

#### Shopping & Checkout
- Non-persistent cart with single quantity limit per product
- Add/remove products, cart summary, clear cart option
- Checkout with required shipping fields and order summary
- Real-time cart counter in header with red badge
- Form validation using regex patterns

### 🔧 Provider Portal

#### Order Management
- Paginated orders table with dummy data
- **Search**: Order ID, product name, customer name
- **Filtering**: Date range, order status
- Dynamic routing for order details (`/provider/orders/[id]`)

#### Order Details
- Complete order information display
- Customer details and product list
- Order status management capabilities

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nutrivital-supplement-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up shadcn/ui**
   ```bash
   npx shadcn-ui@latest init
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧩 Key Components

### Custom Hooks

#### `useCart()`
Manages all cart-related operations:
- Add/remove items
- Update quantities
- Calculate totals
- Clear cart
- Persist cart state

#### `useOrder()`
Handles order data access and management:
- Create new orders
- Fetch order history
- Update order status
- Order pagination and filtering

### Context Providers

#### `CartContext`
Provides cart state and operations throughout the application

#### `OrderContext`  
Manages order state and provides order management functions

## 🔑 Provider Portal Access

The provider portal includes a dummy login system:
- Access via the "Provider" button in the header
- Use dummy credentials (implementation specific)
- Manages orders created through the customer checkout process

## 📱 Responsive Design

The application is fully responsive across all device sizes:
- Mobile-first approach
- Optimized layouts for tablets and desktops
- Touch-friendly interactions
- Accessible navigation patterns

## 🎯 Core Functionality

### Customer Journey
1. Browse products on homepage and catalog
2. Filter/search/sort products
3. View detailed product information
4. Add products to cart
5. Review cart and proceed to checkout
6. Complete order with shipping information

### Admin Workflow
1. Login to provider portal
2. View paginated orders list
3. Search and filter orders
4. View detailed order information
5. Manage order status

## 🚧 Development Notes

- **No Data Persistence**: Cart and orders don't persist between page refreshes
- **Dummy Data**: All product and initial order data comes from JSON files
- **Client-Side State**: All state management handled via React Context
- **Type Safety**: Full TypeScript implementation with proper interfaces

## 📊 Performance Considerations

- Optimized images and lazy loading
- Efficient re-rendering with proper dependency arrays
- Pagination for large data sets
- Responsive image handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the Top Flight Apps AI Trial Task assessment.