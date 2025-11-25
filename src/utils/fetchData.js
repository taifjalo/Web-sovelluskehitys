// utils/fetchData.js
export const fetchData = async (url, options = {}) => {
  try {
    console.log('Fetching URL:', url);
    console.log('Options:', options);

    const response = await fetch(url, options);

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = {message: text};
    }

    if (!response.ok) {
      console.error('API Error:', url, data);
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (err) {
    console.error('Fetch failed:', url, err);
    throw err;
  }
};
