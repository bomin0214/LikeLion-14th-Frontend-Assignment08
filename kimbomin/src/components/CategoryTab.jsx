import useMealStore from "../store/useMealStore";

function CategoryTab() {
  const { categories, selectedCategory, setCategory } = useMealStore();

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat.idCategory}
          onClick={() => setCategory(cat.strCategory)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            selectedCategory === cat.strCategory
              ? "bg-orange-500 text-white shadow"
              : "bg-white text-slate-600 hover:bg-orange-100"
          }`}
        >
          {cat.strCategory}
        </button>
      ))}
    </div>
  );
}

export default CategoryTab;
