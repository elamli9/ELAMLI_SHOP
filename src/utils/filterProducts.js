const filterProducts = (products, language, category, searchTerm, sortOption) => {
      let filtered = [...products];

      if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
      }

      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        filtered = filtered.filter(product =>
          product[`name_${language}`].toLowerCase().includes(searchTermLower) ||
          product[`description_${language}`].toLowerCase().includes(searchTermLower)
        );
      }

      switch (sortOption) {
        case 'priceLowToHigh':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'priceHighToLow':
          filtered.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }

      return filtered;
    };

    export default filterProducts;
