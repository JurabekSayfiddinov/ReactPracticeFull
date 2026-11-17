
import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { addCategoryAtom, categoriesAtom, deleteCategoryAtom, editCategoryAtom, errorAtom, getCategoriesAtom, loadingAtom } from "./store/jotai";



function App() {
  const [categories] = useAtom(categoriesAtom);
  const [loading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);

  const getCategories = useSetAtom(getCategoriesAtom);
  const addCategory = useSetAtom(addCategoryAtom);
  const editCategory = useSetAtom(editCategoryAtom);
  const deleteCategory = useSetAtom(deleteCategoryAtom);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <button onClick={() => addCategory({ name: "Sport" })}>
        Add
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {categories.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>

          <button
            onClick={() =>
              editCategory({
                id: item.id,
                name: "New category",
              })
            }
          >
            Edit
          </button>

          <button onClick={() => deleteCategory(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
