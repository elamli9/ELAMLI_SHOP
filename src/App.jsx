import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { FaSun, FaMoon, FaLanguage, FaArrowLeft, FaSearch } from 'react-icons/fa';

import ProductList from './components/ProductList';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import SortingOptions from './components/SortingOptions';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import ProductDetails from './components/ProductDetails';
import Banner from './components/Banner';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

const firebaseConfig = {
  apiKey: "AIzaSyC3ENJExu01i7yODhQQO5k6-BuZ13737T4",
  authDomain: "elamli-shop.firebaseapp.com",
  databaseURL: "https://elamli-shop-default-rtdb.firebaseio.com",
  projectId: "elamli-shop",
  storageBucket: "elamli-shop.appspot.com",
  messagingSenderId: "740777134694",
  appId: "1:740777134694:web:6064048d820d18540afba7",
  measurementId: "G-MNT2CS1QSD"
};

function App() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true' || false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const productsRef = useRef(null);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.body.dir = i18n.dir();
  }, [language]);

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    let app;
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    const db = getFirestore(app);

    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [firebaseConfig]);

  useEffect(() => {
    const uniqueCategories = ['all', ...new Set(products.map(product => product.category))];
    setCategories(uniqueCategories);
    filterProducts(selectedCategory, searchTerm, sortOption);
  }, [products]);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'ar' : 'en'));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const filterProducts = (category, searchTerm) => {
    let filtered = [...products];

    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product[`name_en`]?.toLowerCase().includes(searchTermLower) ||
        product[`description_en`]?.toLowerCase().includes(searchTermLower) ||
        product[`name_ar`]?.toLowerCase().includes(searchTermLower) ||
        product[`description_ar`]?.toLowerCase().includes(searchTermLower)
      );
    }
    return filtered;
  };

  const sortProducts = (filtered, sortOption) => {
    let sortedProducts = [...filtered];
    switch (sortOption) {
      case 'priceLowToHigh':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  useEffect(() => {
    const filtered = filterProducts(selectedCategory, searchTerm);
    const sorted = sortProducts(filtered, sortOption);
    setFilteredProducts(sorted);
  }, [selectedCategory, searchTerm, sortOption, products]);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const randomBannerProduct = products[Math.floor(Math.random() * products.length)];
  const bannerImageUrl = randomBannerProduct ? randomBannerProduct.image_url : null;
  const bannerAccentColor = randomBannerProduct ? 'red' : 'blue';

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <header className="bg-white dark:bg-gray-800 shadow-md py-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary dark:text-white">ELAMLI</Link>
            <div className="flex items-center space-x-4">
              <button onClick={toggleLanguage} className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none">
                <FaLanguage />
              </button>
              <button onClick={toggleDarkMode} className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none">
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </header>

        <div className="container mx-auto mt-8">
          <Routes>
            <Route path="/" element={
              <>
                <Banner scrollToProducts={scrollToProducts} bannerImageUrl={bannerImageUrl} bannerAccentColor={bannerAccentColor} />
                <div className="flex justify-between items-center mb-4" ref={productsRef}>
                  <CategoryFilter categories={categories} onCategoryChange={handleCategoryChange} />
                  <SearchBar onSearch={handleSearch} />
                  <SortingOptions onSortChange={handleSortChange} />
                </div>
                <ProductList products={filteredProducts} language={language} />
              </>
            } />
            <Route path="/about" element={<AboutUs />} />
             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/product/:productId" element={<ProductDetails language={language} products={products} />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
