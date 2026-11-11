import React, { useEffect, useState } from 'react'
import { deleteUserAtom, getUsersAtom, todoAtom } from './store/store'
import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, editUser, getUsers } from "./app/CounterSlice";


const App = () => {
      let {data,loading}=useSelector((state)=>state.data)
      let dispatch=useDispatch()
      let [editId,setEditId]=useState<number | null>(null)
      let [editUserData, setEditUserData] = useState<User | null>(null)
     useEffect(() => {
         dispatch(getUsers())
     }, [])
     const handleSubmit=(e)=>{
      e.preventDefault()
      let newUser={
         fullname:e.target.fullname.value,
         job:e.target.job.value
      }
      if(editId!==null){
         dispatch(editUser({
            id:editId,
            ...newUser
         }))
         setEditId(null)
      }
      dispatch(addUser(newUser))
      e.target.reset()
     }

      if(loading){
          return <h2>Loading...</h2>
        }
     return (
        <>
      <form onSubmit={handleSubmit} key={editUserData?.id || "new"}>
         <input   defaultValue={editUserData?.fullname} type="text" name="fullname" />
         <input  defaultValue={editUserData?.job} type="text" name="job" />
         <Button type="submit" variant="outlined"> {editUserData ? "Save" : "Add"}</Button>
      </form>
    {data.map((e)=>(
        <div key={e.id}>
            <h1>{e.fullname}</h1>
            <p>{e.job}</p>
            <Button onClick={()=>dispatch(deleteUser(e.id))}>Delete</Button>
            <Button onClick={()=>{
   setEditId(e.id)
}}>
   Edit
</Button>
        </div>
        
    ))}
    
    </>
  )
}

export default App