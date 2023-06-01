const useHTTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (requestConfig, ApplicationOfData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url, {
          method: requestConfig.method,
          headers: requestConfig.headers,
          body: JSON.stringify(requestConfig.body)
        }
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      ApplicationOfData(data); 
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
    return{
      isLoading,
      error,
      sendRequest
    }
  };
};
export default useHTTP;