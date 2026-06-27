import { useState, useEffect } from 'react';

const useFetchProducts = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const json = await res.json();
        
        if (isMounted) {
          // Extracts the array if nested under a "products" key, or reads directly
          setData(json.products || json);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => { isMounted = false; }; // Cleanup prevents memory leaks on unmount
  }, [url]);

  return { data, loading, error };
};

export default useFetchProducts;