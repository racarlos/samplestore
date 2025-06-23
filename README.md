# Sample Store App 🛍️

A React Native e-commerce app built with Expo that lets you browse products, manage your cart, and place orders.

## Features

### 🛒 **Main Features**

- Browse products with search functionality
- Add/remove items from cart with quantity controls
- Real-time cart updates with item count
- Stock validation (can't add more than available stock)

### 💰 **Discount System**

- Apply discount codes: `DISCOUNT10` (10% off) or `PROMO100` (₱100 off)
- Real-time discount calculation
- Remove applied discounts

### 📦 **Order Management**

- Place orders with cart items and applied discounts
- Orders stored locally with unique IDs
- View order history in settings
- Order status tracking (Processing, Delivered, Cancelled)

### 💾 **Data Persistence**

- Cart items saved to AsyncStorage
- Product data persisted locally
- Order history maintained across app sessions
- Seed data for demo purposes

### 🎨 **UI/UX**

- Clean, modern interface with Tailwind CSS
- Responsive product grid layout
- Intuitive cart controls
- Loading states and error handling

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Context + Custom Hooks
- **Storage**: AsyncStorage for local data persistence
- **Icons**: Expo Vector Icons

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the development server

   ```bash
   npx expo start
   ```

3. Open in your preferred environment (iOS Simulator, Android Emulator, or Expo Go)

## App Structure

```
app/
├── (tabs)/
│   ├── index.tsx      # Product catalog
│   ├── cart.tsx       # Shopping cart & checkout
│   └── settings.tsx   # Order history & app settings
hooks/
├── useCart.ts         # Cart state management
├── useProducts.ts     # Product data management
└── useOrders.ts       # Order management
providers/
├── CartProvider.tsx   # Cart context
└── OrdersProvider.tsx # Orders context
```

## Demo Data

The app comes with:

- 6 sample products with random names and prices
- 3 sample orders in history
- 2 discount codes for testing

## Development Notes

- Uses faker.js for generating demo data
- All data is stored locally (no backend required)
- Built with TypeScript for type safety
- Follows React Native best practices
