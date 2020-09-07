import React,{useState} from 'react';
import './App.css';
import Form from "./component/Form"
import TodoList from "./component/TodoList"

  
function App() {
  const [Url, setUrl] = useState([]);
  return (
    <div className="App">
      <h1 style={{textAlign:"center",color:"black"}}>
        Url Shortner
      </h1>
      <Form Url={Url}  setUrl={setUrl} />
      <TodoList Url={Url} />
    </div>
  );
}

export default App;
