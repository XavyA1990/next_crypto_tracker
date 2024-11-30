export const fetchNews = async (page, setNews, setError, setLoading) => {
  try {
    setLoading(true);
    const response = await fetch(`/api/v1/fetchCryptoNews?page=${page}`);
    const result = await response.json();
    const { data } = result;
    setNews(data);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
};
