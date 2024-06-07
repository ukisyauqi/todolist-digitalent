import { useEffect, useState } from "react";
import bg from "./assets/bg-desktop-light.jpg";

function App() {
  const [todos, setTodos] = useState([
    {
      checked: false,
      content: "Belajar React",
    },
  ]);

  const [filteredTodos, setFilteredTodos] = useState(todos);

  function addTodo(e) {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        checked: false,
        content: e.target[0].value,
      },
    ]);
  }

  const [activeTab, setActiveTab] = useState(0);

  function deleteAllTodos() {
    setTodos([]);
  }

  function showAllTodos() {
    setActiveTab(0);
    setFilteredTodos(todos);
  }

  function showCompletedTodos() {
    setActiveTab(1);
    setFilteredTodos(todos.filter((todo) => todo.checked === true));
  }

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <main className="flex min-h-screen flex-col items-center md:p-24 p-4">
      <img
        src={bg}
        alt="bg"
        className="h-96 -z-10 absolute top-0 min-h-96 object-cover w-full"
      />
      <section className="max-w-[700px] mx-auto container">
        <div className="flex justify-between items-center">
          <h1 className="text-[3rem] text-white font-bold tracking-[1rem]">
            TODO
          </h1>
          <div className="group">
            <p className="text-3xl bg-white rounded-full size-10">🙍</p>
            <div className="hidden group-hover:block bg-white rounded absolute p-2 shadow-lg">
              <p>Muhamad Syauqi Fadhlika</p>
              <p>Fullstack Developer</p>
            </div>
          </div>
        </div>

        <form
          className="flex items-center rounded-lg bg-white gap-4 mt-6 px-4"
          onSubmit={addTodo}
        >
          <input type="text" className="w-full p-4" />
          <input
            type="submit"
            className="bg-purple-500 rounded px-3 py-1 text-white cursor-pointer hover:bg-purple-400"
          />
        </form>

        <div className="mt-4 rounded-lg bg-white shadow-lg">
          <div className="flex justify-between items-center p-4">
            <div className="flex gap-6">
              <button
                className={activeTab === 0 ? "text-black" : "text-gray-400"}
                onClick={showAllTodos}
              >
                Show All
              </button>
              <button
                className={activeTab === 1 ? "text-black" : "text-gray-400"}
                onClick={showCompletedTodos}
              >
                Done
              </button>
            </div>
            <button
              onClick={deleteAllTodos}
              className="hover:text-black text-gray-400"
            >
              Delete All
            </button>
          </div>

          {filteredTodos.map((todo, i) => (
            <div className="flex items-center gap-4 p-4 border-t group" key={i}>
              <input
                type="checkbox"
                className="size-6 accent-purple-500"
                checked={todo.checked}
                onChange={() => {
                  setTodos(
                    todos.map((todo, j) =>
                      i === j
                        ? {
                            ...todo,
                            checked: !todo.checked,
                          }
                        : todo
                    )
                  );
                }}
              />
              <p type="text" className={todo.checked ? "line-through" : ""}>
                {todo.content}
              </p>
              <div className="flex-1"></div>
              <button
                className="cursor-pointer invisible group-hover:visible font-bold"
                onClick={() => setTodos(todos.filter((_, j) => i !== j))}
              >
                ╳
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
