import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

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

const reviews = {
  en: [
    { author: "John Doe", rating: 5, comment: "Great product! Highly recommend it." },
    { author: "Jane Smith", rating: 4, comment: "Excellent quality and fast shipping." },
    { author: "Mike Johnson", rating: 5, comment: "I love this item! It's exactly what I was looking for." },
    { author: "Emily Brown", rating: 4, comment: "The best purchase I've made this year!" },
    { author: "David Wilson", rating: 5, comment: "Amazing value for the price." }
  ],
  ar: [
    { author: "أحمد", rating: 5, comment: "منتج رائع! أوصي به بشدة." },
    { author: "ليلى", rating: 4, comment: "جودة ممتازة وشحن سريع." },
    { author: "محمد", rating: 5, comment: "أنا أحب هذا المنتج! إنه بالضبط ما كنت أبحث عنه." },
    { author: "فاطمة", rating: 4, comment: "أفضل عملية شراء قمت بها هذا العام!" },
    { author: "علي", rating: 5, comment: "قيمة مذهلة للسعر." }
  ]
};

function ProductDetails({ language, products }) {
  const { productId } = useParams();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
   const navigate = useNavigate();
    const [fade, setFade] = useState(true);

  useEffect(() => {
    let app;
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    const db = getFirestore(app);

    const fetchProduct = async () => {
      try {
        const productDoc = doc(db, 'products', productId);
        const productSnapshot = await getDoc(productDoc);

        if (productSnapshot.exists()) {
          setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId, firebaseConfig]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews[language].length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [language]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const suggestedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
   const randomProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="inline-flex items-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
          <FaArrowLeft className="mr-2" />
        </Link>
        {product.tag && (
          <span className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
            {product.tag}
          </span>
        )}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="aspect-w-1 aspect-h-1">
          <img src={product.image_url} alt={product[`name_${language}`]} className="w-full h-full object-cover object-center" style={{ height: '400px' }} />
        </div>
        <div className="p-4">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{product[`name_${language}`]}</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{product[`description_${language}`]}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-primary font-bold text-xl">${product.price}</span>
            <button onClick={() => window.open(product.buy_link, '_blank')} className="bg-primary text-white py-3 px-6 rounded-full hover:bg-blue-700 focus:outline-none transition-colors duration-300">
              {t('buyNow')}
            </button>
          </div>
           <div className={`mt-4 text-center p-4 border rounded-md transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-center mb-2">
              {[...Array(reviews[language][currentReviewIndex].rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <p className="italic text-gray-500 dark:text-gray-400">"{reviews[language][currentReviewIndex].comment}"</p>
            <p className="text-gray-500 dark:text-gray-400">- {reviews[language][currentReviewIndex].author}</p>
          </div>
        </div>
      </div>

      {suggestedProducts.length > 0 && (
        <div className="mt-8">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{t('suggestedProducts')}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {suggestedProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-card bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
                <img src={product.image_url} alt={product[`name_${language}`]} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product[`name_${language}`]}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-primary font-bold">${product.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
       {randomProducts.length > 0 && (
        <div className="mt-8">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{t('Random Products')}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {randomProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-card bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
                <img src={product.image_url} alt={product[`name_${language}`]} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product[`name_${language}`]}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-primary font-bold">${product.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
