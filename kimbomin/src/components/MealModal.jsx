import useMealStore from "../store/useMealStore";

function MealModal() {
  const { selectedMeal, closeModal } = useMealStore();

  if (!selectedMeal) return null;

  const meal = selectedMeal;

  // 재료 목록 만들기 (strIngredient1~20)
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(`${ing} - ${measure}`);
    }
  }

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-2xl font-bold text-slate-800">{meal.strMeal}</h2>
          <button
            onClick={closeModal}
            className="text-2xl text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="mb-4 w-full rounded-2xl"
        />

        <p className="mb-4 text-sm text-orange-500">
          {meal.strCategory} · {meal.strArea}
        </p>

        <h3 className="mb-2 font-bold text-slate-700">재료</h3>
        <ul className="mb-4 list-disc pl-5 text-sm text-slate-600">
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3 className="mb-2 font-bold text-slate-700">조리법</h3>
        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
          {meal.strInstructions}
        </p>
      </div>
    </div>
  );
}

export default MealModal;
