import { useAddTodoMutation, useDeleteTodoMutation, useEditTodoMutation, useGetTodosQuery } from "./store/todosApi";


const App = () => {
  const { data, isLoading, isError } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  async function handleAdd() {
    try {
      await addTodo({
        name: "Learn React",
        description: "Practice RTK Query",
        isCompleted: false,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit(id: number) {
    try {
      await editTodo({
        id,
        body: {
          name: "Updated Todo",
          description: "Updated description",
          isCompleted: true,
        },
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteTodo(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Something went wrong...</h2>;

  return (
    <div>
      <h1>Todo List</h1>

      <button onClick={handleAdd}>
        Add Todo
      </button>

      {data?.data?.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>
          <p>{todo.isCompleted ? "Completed" : "Pending"}</p>

          <button onClick={() => handleEdit(todo.id)}>
            Edit
          </button>

          <button onClick={() => handleDelete(todo.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;