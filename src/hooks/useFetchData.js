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

  const handleButtonChange = (index) => {
    const updatedData = data.map((todoData, i) =>
      i === index ? { ...todoData, completed: true } : todoData
    );
    setData(updatedData);
  };
  return { isLoading, error, data, handleButtonChange };
};

export default useFetchData;
