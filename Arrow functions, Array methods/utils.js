// Connection to DB: Generic fetch function (arrow + ternary operator)
export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return !response.ok
      ? Promise.reject(`HTTP error! status: ${response.status}`)
      : await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
