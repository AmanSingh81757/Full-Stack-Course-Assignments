import Todo from "./Todo";
import React, { useEffect, useState } from "react";
import axios from "axios";

function useTodo(){
  const [todos, setTodos] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3000/todos").then((response)=>{
      setTodos(response.data)
    })
    setInterval(()=>{
      axios.get("http://localhost:3000/todos").then((response)=>{
        setTodos(response.data)
      })
    }, 4000)
  }, [])
  return todos;
}

function sendTodo(title, description){
  axios.request({
    method: 'POST',
    url: 'http://localhost:3000/todos',
    data: {
      title: title,
      description: description
    }
  })
}
function App(){
  let todos = useTodo();
  const [title, setTitle] = useState("");
  const onChangeTitle = (e)=>{
      setTitle(e.target.value);
  };
  const [description, setDescription] = useState("");
  const onChangeDescription = (e)=>{
    setDescription(e.target.value);
  };
  return (
    <>
      <div>Hello world</div>
      <input placeholder="Title" onChange={onChangeTitle}></input> <br />
      <input placeholder="description" onChange={onChangeDescription}></input> <br />
      <button onClick={()=>{sendTodo(title, description)}}>Send Todo</button>
      {todos.map(todo=>{
        return (
          <Todo {...todo}></Todo>
        )
      })}
    </>
  )
}

export default App;