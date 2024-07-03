import { useState, useEffect } from "react";

function TodoList() {
  const [todoList, setTodoList] = useState(() => {
    const ds = JSON.parse(localStorage.getItem("todoList") || "[]");
    return ds.length !== 0 ? ds : ["dong 1", "dong 2", "dong 3"];
  });

  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  function handleInputChange(event) {
    setNewTodo(event.target.value);
  }

  function handleEditInputChange(event) {
    setEditingText(event.target.value);
  }

  function addTodo() {
    if (newTodo.trim() !== "") {
      setTodoList([...todoList, newTodo]);
      setNewTodo("");
    }
  }

  function deleteTodo(index) {
    const updatedTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedTodoList);
  }

  function moveTodoUp(index) {
    if (index > 0) {
      const updatedTodoList = [...todoList];
      [updatedTodoList[index], updatedTodoList[index - 1]] = [
        updatedTodoList[index - 1],
        updatedTodoList[index],
      ];
      setTodoList(updatedTodoList);
    }
  }

  function moveTodoDown(index) {
    if (index < todoList.length - 1) {
      const updatedTodoList = [...todoList];
      [updatedTodoList[index], updatedTodoList[index + 1]] = [
        updatedTodoList[index + 1],
        updatedTodoList[index],
      ];
      setTodoList(updatedTodoList);
    }
  }

  function startEditing(index) {
    setEditingIndex(index);
    setEditingText(todoList[index]);
  }

  function saveEdit(index) {
    if (editingText.trim() !== "") {
      const updatedTodoList = [...todoList];
      updatedTodoList[index] = editingText;
      setTodoList(updatedTodoList);
      setEditingIndex(-1);
      setEditingText("");
    }
  }

  function cancelEdit() {
    setEditingIndex(-1);
    setEditingText("");
  }

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div>
        <input
          className="input"
          type="text"
          placeholder="Enter a Todo..."
          value={newTodo}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTodo}>
          Add
        </button>
      </div>

      <ol>
        {todoList.map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <input
                  className="input-edit"
                  type="text"
                  value={editingText}
                  onChange={handleEditInputChange}
                />
                <button className="save-button" onClick={() => saveEdit(index)}>
                  Save
                </button>
                <button className="cancel-button" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <span className="text">{todo}</span>
            )}

            {editingIndex !== index && (
              <>
                <button
                  className="edit-button"
                  onClick={() => startEditing(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteTodo(index)}
                >
                  Delete
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTodoUp(index)}
                >
                  UP
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTodoDown(index)}
                >
                  DOWN
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoList;
