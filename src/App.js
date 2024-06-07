import { useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import  Button  from '@mui/material/Button';

//Firebase code
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7VZMH4aSfywBRk0xnakBmBCzBkp5aNNI",
  authDomain: "todo-list-app-f8396.firebaseapp.com",
  projectId: "todo-list-app-f8396",
  storageBucket: "todo-list-app-f8396.appspot.com",
  messagingSenderId: "652245729213",
  appId: "1:652245729213:web:27ae28fa286d6c44839cd4",
  measurementId: "G-WCJ2RTKHFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//----


const TodoItemInputField = (props) => {
  const [input, setInput] = useState("");

  const onSubmit = ()=>{
    props.onSubmit(input);
    setInput("");
  }
  return (
    <div>
      <TextField 
        id="outlined-basic" 
        label="Todo Item" 
        value={input} 
        variant="outlined" 
        onChange={(e)=>{setInput(e.target.value)}}
      />
      <Button variant='outlined' onClick={onSubmit}>submit</Button>
    </div>
  )
}

const TodoItemList = (props) =>{

  const todoList = props.todoItemList.map((todoItem, index) => {
    return <TodoItem 
      key={todoItem.id} 
      todoItem={todoItem} 
      onTodoItemClick={props.onTodoItemClick}
      onRemoveClick={props.onRemoveClick}
    />;
  });

    
  return(
    <div>
      <ul>{todoList}</ul>
    </div>
  );
};

const TodoItem = (props) => {
  const style = props.todoItem.isFinished ? {textDecoration:'line-through'} : {};
  return (
    <li>
      <span 
      style={style}
      onClick={()=> props.onTodoItemClick(props.todoItem)}>
        {props.todoItem.todoItemContent}</span>
        <Button variant='outlined' onClick={()=>{props.onRemoveClick(props.todoItem)}}>Remove</Button>
    </li>
  )
}

let todoItemId = 0;
function App() {

  const [todoItemList, setTodoItemList] = useState([]);
  const onSubmit =(newTodoItem) =>{
    setTodoItemList([...todoItemList, {
      id: todoItemId++,
      todoItemContent: newTodoItem,
      isFinished: false
    }]);
  };

  const onTodoItemClick = (clickTodoItem) =>{
    console.log("click");
    setTodoItemList(todoItemList.map((todoItem)=>{
      if(clickTodoItem.id === todoItem.id) {
        console.log("click2");
        console.log(clickTodoItem.isFinished);
        return {
          id: clickTodoItem.id,
          todoItemContent: clickTodoItem.todoItemContent,
          isFinished: !clickTodoItem.isFinished,
        };
      }else{
        console.log("click3");
        return todoItem
      }
    }));
  };

  const onRemoveClick=(removeTodoItem)=>{
    setTodoItemList(todoItemList.filter((todoItem)=>{
      return todoItem.id !== removeTodoItem.id;
    }));
  };

  return (
    <div className="App">
      <TodoItemInputField onSubmit={onSubmit}/>
      <TodoItemList 
        todoItemList={todoItemList} 
        onTodoItemClick={onTodoItemClick} 
        onRemoveClick={onRemoveClick}
      />
    </div>
  );
}

export default App;
