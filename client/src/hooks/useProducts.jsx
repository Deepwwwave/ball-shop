// Custom hook to fetch products
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqGetAllProducts } from '../api/request/product';
import { loadProductsReducer } from '../store/slices/products';

const useProducts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const products = useSelector((state) => state.products.products);

  const urlServer = import.meta.env.VITE_APP_LOCAL_URL_BACK ;

  const getServerProducts = async () => {
    try {
      const res = await reqGetAllProducts();
      dispatch(loadProductsReducer(res.products));
    } catch (error) {
      console.error('Error loading products', error);
      setError(error.message);
    } finally {
      setLoading(false);
      console.log("inside finally")
    }
  };

  const getReduxProducts = () => { // Par défault ce sera les produits dans redux qui seront chargé si { products.length !== 0 } , (voir le useEffect ci dessous)
      setLoading(false);
  };
  

  useEffect(() => {
    if (products.length === 0) {
      getServerProducts();
    } else {
      getReduxProducts();
    }
  }, [products]);

  return { products, loading, error, urlServer };
};

export default useProducts;
