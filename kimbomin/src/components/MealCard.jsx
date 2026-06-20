import useMealStore from "../store/useMealStore";

function MealCard({ meal }) {
  const fetchMealDetail = useMealStore((state) => state.fetchMealDetail);

  return (
    <div
      onClick={() => fetchMealDetail(meal.idMeal)}
      className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="aspect-square w-full object-cover"
      />
      <div className="p-3">
        <h3 className="text-center text-sm font-bold text-slate-800">
          {meal.strMeal}
        </h3>
      </div>
    </div>
  );
}

export default MealCard;
