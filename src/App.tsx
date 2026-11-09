import React, { useEffect, useState } from 'react'
import { deleteUserAtom, getUsersAtom, todoAtom } from './store/store'
import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, editUser } from "./app/CounterSlice";

const App = () => {
      let {data}=useSelector((state)=>state.data)
      let dispatch=useDispatch()
      let [elem,setElem]=useState({})
      let handleEdit=(e)=>{
         setElem(e)

      }
      let handleSubmit=(e)=>{
         e.preventDefault()
         let newUser={
            id:elem.id?elem.id:Date.now(),
            name:e.target.name.value,
            job:e.target.job.value
         }
         elem.id?dispatch(editUser(newUser)): dispatch(addUser(newUser))
         e.target.reset()
         
      }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <input defaultValue={elem.name} name="name" type="text" />
      <input defaultValue={elem.job} name="job" type="text" />
      <button type="submit">{elem.id?"Save":"Add"}</button>
    </form>
    {data.map((e)=>(
        <div key={e.id}>
            <h1>{e.name}</h1>
            <p>{e.job}</p>
            <Button onClick={()=>dispatch(deleteUser(e.id))}>Delete</Button>
            <Button onClick={()=>handleEdit(e)}>Edit</Button>
        </div>
        
    ))}
    
    </>
  )
}

export default App