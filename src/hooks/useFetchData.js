import { useEffect, useState } from "react";

const useFetchData = (fetchFunction, params) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const responseData = await fetchFunction(params);
        setData(responseData);
      } catch (e) {
        setError(e?.message || "Error in fetching data");
      }

      setIsLoading(false);
    };

    fetchData();
  }, [fetchFunction, params]);

  
  return { isLoading, error, data, setData };
};

export default useFetchData;
