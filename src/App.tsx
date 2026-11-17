
import { useEffect, useState } from "react";
import { useCategoryStore } from "./store/zustand";


const App = () => {
  const {
    data,
    loading,
    error,
    getCategories,
    addCategory,
    editCategory,
    deleteCategory,
  } = useCategoryStore();

  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  async function handleSubmit() {
    if (!name.trim()) return;

    if (editId !== null) {
      await editCategory(editId, { name });
      setEditId(null);
    } else {
      await addCategory({ name });
    }

    setName("");
  }

  function handleEdit(id: number, categoryName: string) {
    setEditId(id);
    setName(categoryName);
  }

  return (
    <div>
      <h1>Categories CRUD</h1>

      <input
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {editId !== null ? "Edit" : "Add"}
      </button>

      {loading && <h3>Loading...</h3>}

      {error && <p>{error}</p>}

      {data.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>

          <button
            onClick={() => handleEdit(category.id, category.name)}
          >
            Edit
          </button>

          <button
            onClick={() => deleteCategory(category.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
