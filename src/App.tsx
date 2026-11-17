
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

import {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
} from "./CounterSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <button
        onClick={() =>
          dispatch(addCategory({ name: "Sport" }))
        }
      >
        Add
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {data.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>

          <button
            onClick={() =>
              dispatch(
                editCategory({
                  id: item.id,
                  name: "New category",
                })
              )
            }
          >
            Edit
          </button>

          <button
            onClick={() => dispatch(deleteCategory(item.id))}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
