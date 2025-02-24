import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function ProductList({ products, language }) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <Link to={`/product/${product.id}`} key={product.id} className="product-card bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
          <div className="aspect-w-1 aspect-h-1">
            <img src={product.image_url} alt={product[`name_${language}`]} className="w-full h-full object-cover object-center" style={{ height: '200px' }} />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product[`name_${language}`]}</h3>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-primary font-bold">${product.price}</span>
              {product.tag && (
                <span className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">{product.tag}</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductList;
