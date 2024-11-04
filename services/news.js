import axios from "axios";

export const fetchNews = async (page, setNews, setError, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get(`/api/v1/fetchCryptoNews?page=${page}`);
    const { data } = response.data;
    setNews(data);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
};
