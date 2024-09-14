import Todocard from "./components/todocard"
import Navbar from "./components/Navbar"
import { useEffect, useState } from 'react'
import './index.css'
import { v4 as uuidv4 } from 'uuid';
import Modal from "./components/Modal";
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [value,setValue]=useState();
  const [todo, setTodo]=useState("");
  const [todos, setTodos]=useState([]);
  const [mopen,setMopen]=useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null); // To store the todo item to delete


  useEffect(() => {
    const todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(todoString)
      console.log(todos)
      setTodos(todos);
    }
  }, []);

  const saveTodos=(param)=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  // useEffect(() => {
  //   console.log("Saving todos to localStorage:", todos);
  //   localStorage.setItem("todos", JSON.stringify(todos));
  //   const todoString2=localStorage.getItem("todos")
  //   if(todoString2){
  //     let todos=JSON.parse(todoString2)
  //     console.log(todos)
  //   }
  // }, [todos]);

  const handleAdd=()=>{
    setTodos([...todos, {todo, isComp: false, id: uuidv4()}])
    setTodo("");
    console.log(todos)
    saveTodos();
    // saveTodos();
  }
  const handleChange=(e)=>{
    setTodo(e.target.value)
    // setForm(...from, {[e.target.name]: e.target.value})
  }
  const handleEdit=(e)=>{
    const idedit=e.target.id;
    let t=todos.filter(i=>i.id===idedit);
    // console.log(t[0].todo);
    setTodo(t[0].todo);

    console.log("Deleting todo with ID:", idedit); // Debugging
    const updatedTodos2 = todos.filter((item) => item.id !== idedit);
    console.log(updatedTodos2); // Log updatedTodos2 to see the new list
    setTodos(updatedTodos2);

    saveTodos();
    // saveTodos();
  }
  
  // const handleDelete = (e) => {
  //   const iddd = e.target.id;
  //   console.log("Deleting todo with ID:", iddd); // Debugging
  //   const updatedTodos2 = todos.filter((item) => item.id !== iddd);
  //   console.log(updatedTodos2); // Log updatedTodos2 to see the new list
  //   setTodos(updatedTodos2);
  //   // setMopen(true);

    // saveTodos()
  // };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    // setMopen(false);
    saveTodos();
    // saveTodos();
  };

  const openModal = (id) => {
    setTodoToDelete(id);
    setMopen(true);
  };

  const handleComp = (e) => {
    const id = e.target.id;
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isComp: !item.isComp } : item
    );
  
    setTodos(updatedTodos);

    saveTodos();
    // saveTodos();
  };
  

  return (
    <>
      <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
        <div className="mbox">
          <Navbar/>
          <div className="inp" style={{display:'flex', paddingTop:'10px', gap:'5vw'}}>
            <input className='inptext' value={todo} onChange={handleChange} onKeyDown={(e)=>{
              if (e.key === 'Enter') {
                e.preventDefault();
                console.log('enter pressed')
                handleAdd();
              }
            }} type="text" placeholder="Enter your todo"/>
            <button className="addbtn" onClick={handleAdd}>Add</button>
          </div>
          <div className="listBox">
            {todos.length===0 && <div>No Todos </div>}
            {todos.map(item => {
              return <div className="TODO" key={item.id}>
                <div className="checktxt">
                  <input type="checkbox" checked={item.isComp} value={item.isComp} name="comp" id={item.id} onClick={handleComp}/>
                  <div className="thing" style={{ textDecoration: item.isComp ? "line-through" : "none" }}>{item.todo}</div>
                </div>
                
                <div className="edel">
                  <button className="edit" id={item.id} onClick={handleEdit}>edit</button>
                  <button className="delete" id={item.id}  onClick={() => openModal(item.id)}>delete</button>
                </div>
              </div>
            })}
          </div>
          <div className="save"><button onClick={saveTodos}>SAVE</button></div>
        </div>
        {mopen && <Modal  mopen={mopen} setMopen={setMopen} handleDelete={handleDelete} todoToDelete={todoToDelete}/>}
      </div>
    </>
  )
}

export default App
