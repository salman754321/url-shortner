import React,{useState} from 'react'
import {CreateUrl} from "../action"
 const Form = ({setUrl,Url}) => {
 const [Input, setInput] = useState("");
 const inputHandler=(e)=>{
   setInput(e.target.value);
 }
const  submitHandler=async(e)=>{
   e.preventDefault();
   console.log(Input)
   let res= await CreateUrl(Input);
   let ur=`https://url-shrtner.herokuapp.com/${res.slug}`;
   setUrl([...Url,ur])

 }
    return (
    <form>
      <input value={Input} onChange={inputHandler} type="text" className="todo-input" />
      <button className="todo-button" onClick={submitHandler} type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
    </form>
        
    )
}

export default Form;
