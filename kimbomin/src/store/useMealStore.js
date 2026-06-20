import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_MEAL_BASE_URL;

const useMealStore = create((set, get) => ({
  meals: [],
  categories: [],
  selectedCategory: "Beef",
  query: "",
  selectedMeal: null,
  loading: false,

  setQuery: (query) => set({ query }),
  setCategory: (selectedCategory) => set({ selectedCategory }),
  closeModal: () => set({ selectedMeal: null }),

  fetchCategories: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/categories.php`);
      set({ categories: res.data.categories });
    } catch (error) {
      console.error(error);
    }
  },

  fetchMealsByCategory: async () => {
    const { selectedCategory } = get();
    set({ loading: true });
    try {
      const res = await axios.get(`${BASE_URL}/filter.php?c=${selectedCategory}`);
      set({ meals: res.data.meals });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  searchMeals: async () => {
    const { query } = get();
    set({ loading: true });
    try {
      const res = await axios.get(`${BASE_URL}/search.php?s=${query}`);
      set({ meals: res.data.meals || [] });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchMealDetail: async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
      set({ selectedMeal: res.data.meals[0] });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useMealStore;
