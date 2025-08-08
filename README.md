# React Ecommerce 🛍️

A modern, full-stack ecommerce application built with React, Node.js, and cutting-edge technologies including AI features and blockchain integration.

![React Ecommerce](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-16+-green?style=for-the-badge&logo=node.js)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.2.1-purple?style=for-the-badge&logo=bootstrap)

## ✨ Features

### 🛒 **Core Ecommerce**
- **Product Catalog**: Responsive grid with filtering and search
- **Product Cards**: Modern design with ratings, variants, and wishlist
- **Shopping Cart**: Persistent cart with quantity management
- **Checkout Process**: Complete checkout flow with validation

### 🤖 **AI-Powered Features**
- **Smart Search**: Natural language product search
- **Dynamic Pricing**: Real-time price adjustments based on demand
- **Recommendations**: Personalized product suggestions
- **AI Catalog**: Interactive demo with three AI modes

### ⛓️ **Blockchain Integration**
- **Multi-Wallet Support**: MetaMask, WalletConnect, Coinbase Wallet
- **Network Detection**: Automatic network switching
- **Transaction Lifecycle**: Complete UI state management
- **Web3 Demo**: Interactive blockchain features

### 🎨 **Modern Design**
- **Responsive Layout**: Works perfectly on all devices
- **High Contrast Theme**: Excellent accessibility and readability
- **Glass Morphism**: Modern UI effects and animations
- **Custom Components**: Reusable, modular design system

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/cryptojoker710/react-ecommerce.git
cd react-ecommerce

# Install dependencies
npm install

# Start the development servers
npm run start:test
```

### Running the Application

```bash
# Start both backend and frontend (recommended)
npm run start:test

# Or start them separately
npm run server    # Backend on port 4001
npm run client    # Frontend on port 3000
```

## 📱 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4001/api/v1/products
- **AI Catalog**: http://localhost:3000/ai
- **Blockchain Demo**: http://localhost:3000/blockchain
- **Product Card Demo**: http://localhost:3000/product-card-demo

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router 6** - Client-side routing
- **Redux Toolkit** - State management
- **Bootstrap 5** - Responsive CSS framework
- **Font Awesome** - Icon library
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JSON Storage** - File-based data (test mode)
- **MongoDB** - Database (production ready)

### Blockchain
- **Ethers.js** - Ethereum library
- **MetaMask API** - Wallet integration
- **WalletConnect** - Multi-wallet support
- **Coinbase Wallet SDK** - Additional wallet option

### AI Features
- **Natural Language Processing** - Smart search
- **Rule-based Engine** - Dynamic pricing
- **Recommendation System** - Product suggestions

## 📁 Project Structure

```
react-ecommerce/
├── api/                    # Backend server
│   ├── controllers/       # API controllers
│   ├── routes/           # API routes
│   ├── data/             # JSON data files
│   └── server.js         # Express server
├── src/                   # Frontend React app
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── styles/          # Global styles
│   └── redux/           # State management
├── public/               # Static assets
└── docs/                # Documentation
```

## 🔧 API Endpoints

### Products API
```bash
# Get all products
GET /api/v1/products

# Get product by ID
GET /api/v1/products/:id

# Filter by category
GET /api/v1/products?category=electronics

# Create new product
POST /api/v1/products
```

### Example Usage
```bash
# Test the API
curl http://localhost:4001/api/v1/products
curl http://localhost:4001/api/v1/products/123245
curl "http://localhost:4001/api/v1/products?category=electronics"
```

## 🎯 Key Features Demo

### 1. **Product Catalog**
- Responsive grid layout
- Category filtering
- Search functionality
- Add to cart with variants

### 2. **AI Catalog** (`/ai`)
- **Smart Search**: "running shoes under $100"
- **Dynamic Pricing**: Adjust prices based on demand
- **Recommendations**: Personalized suggestions

### 3. **Blockchain Demo** (`/blockchain`)
- Connect multiple wallets
- Switch networks (Ethereum, Polygon)
- Test transactions
- Real-time UI updates

### 4. **Product Cards** (`/product-card-demo`)
- Modern card design
- Rating system
- Wishlist functionality
- Variant selection

## 🧪 Testing

### Manual Test Cases
- **QA Report**: `QA_Report.md` - Comprehensive test results
- **Test Cases**: `QA_FULL_TEST_CASES.csv` - 23 detailed test cases
- **Bug Reports**: `QA_FULL_BUG_REPORTS.md` - 9 documented bugs

### Automated Testing
```bash
# Run tests (if configured)
npm test

# Check for linting issues
npm run lint
```

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices)
- **Bundle Size**: Optimized with code splitting
- **Image Optimization**: Lazy loading and compression
- **Responsive Design**: Mobile-first approach

## 🔒 Security

- **Environment Variables**: Sensitive data protection
- **Input Validation**: Server-side validation
- **CORS Configuration**: Proper cross-origin handling
- **Error Handling**: Graceful error management

## 🌟 Highlights

### **Modern Architecture**
- Component-based design
- Modular file structure
- Clean code practices
- Comprehensive documentation

### **Developer Experience**
- Hot reloading
- Error boundaries
- Debug tools
- Clear console messages

### **Production Ready**
- Environment configuration
- Build optimization
- Error monitoring
- Performance tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Bootstrap Team** - For the responsive CSS framework
- **Unsplash** - For beautiful product images
- **Font Awesome** - For the icon library

## 📞 Support

If you have any questions or need help:

- **Issues**: [GitHub Issues](https://github.com/cryptojoker710/react-ecommerce/issues)
- **Documentation**: Check the `/docs` folder
- **Email**: [Your Email]

---

**Made with ❤️ by [Your Name]**

⭐ **Star this repository if you found it helpful!**
