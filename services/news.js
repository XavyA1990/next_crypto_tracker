export const fetchNews = async (page, setNews, setError, setLoading, lang) => {
  try {
    setLoading(true);
    const url  = `/api/v1/fetchCryptoNews?page=${page}&lang=${lang}`;
    const response = await fetch(url);
    const result = await response.json();
    const { data } = result;
    setNews(data);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
};
