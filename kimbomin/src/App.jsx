import { useEffect, useState } from "react";
import useMealStore from "./store/useMealStore";
import CategoryTab from "./components/CategoryTab";
import MealCard from "./components/MealCard";
import MealModal from "./components/MealModal";

function App() {
  const [input, setInput] = useState("");
  const {
    meals,
    loading,
    selectedCategory,
    setQuery,
    fetchCategories,
    fetchMealsByCategory,
    searchMeals,
  } = useMealStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMealsByCategory();
  }, [selectedCategory]);

  const handleSearch = async () => {
    setQuery(input);
    await searchMeals();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 px-8 py-12">
      <h1 className="mb-2 text-center text-4xl font-bold text-amber-900">
        세계 음식 레시피
      </h1>

      <div className="mb-8 flex justify-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-64 rounded-xl border border-amber-200 bg-white px-4 py-2 shadow-sm focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="rounded-xl bg-amber-500 px-5 py-2 font-semibold text-white shadow hover:bg-amber-600"
        >
          검색
        </button>
      </div>

      <CategoryTab />

      {loading && <p className="text-center text-slate-500">불러오는 중...</p>}

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

      <MealModal />
    </div>
  );
}

export default App;
