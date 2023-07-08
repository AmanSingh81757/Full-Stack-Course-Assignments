import axios from "axios";
function deleteTodo(id){
    axios.delete(`http://localhost:3000/todos/${id}`);
}

function Todo(props){
    return(
        <>
            <div>
                <h2>{props.title}</h2>
                <h2>{props.description}</h2> <span>{props.id}</span> <br />
                <button onClick={()=>{deleteTodo(props.id)}}>Delete</button>
            </div>
        </>
    )
}

export default Todo;