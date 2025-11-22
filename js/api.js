import { restApi } from "./variables.js";
import { fetchData } from "./utils.js";

const mockRestaurants = [
  {
    _id: "1",
    name: "Metro Cafe",
    company: "Sodexo",
    city: "Helsinki",
    address: "Mannerheimintie 1",
    location: { coordinates: [24.941, 60.169] },
  },
  {
    _id: "2",
    name: "Campus Bistro",
    company: "Compass Group",
    city: "Espoo",
    address: "Otaniementie 5",
    location: { coordinates: [24.654, 60.188] },
  },
];

export const getRestaurants = async () => {
  try {
    return await fetchData(`${restApi}/restaurants`);
  } catch (err) {
    console.warn("Using mock restaurants due to API failure.");
    return mockRestaurants;
  }
};

export const getDailyMenu = async (id, lang = "fi") => {
  try {
    return await fetchData(`${restApi}/restaurants/daily/${id}/${lang}`);
  } catch (err) {
    console.warn("Using mock daily menu");
    return {
      courses: [
        { name: "Pasta", price: "6.50" },
        { name: "Salad", price: "4.00" },
      ],
    };
  }
};

export const getWeeklyMenu = async (id, lang = "fi") => {
  try {
    return await fetchData(`${restApi}/restaurants/weekly/${id}/${lang}`);
  } catch (err) {
    console.warn("Using mock weekly menu");
    return {
      courses: [
        { name: "Mon: Pasta", price: "6.50" },
        { name: "Tue: Curry", price: "6.90" },
        { name: "Wed: Soup", price: "5.00" },
      ],
    };
  }
};
