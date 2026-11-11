import { useAtom } from "jotai"
import { useDispatch } from "react-redux"
import { addUserJ } from "../store/jotai"
import { getData } from "../store/zustand"
import { addR } from "../store/CounterSlice"
import { Button, Dialog } from "@mui/material"
import { useState } from "react"

const AddDialog = ({open,setOpen}) => {
   let dispatch=useDispatch()
   let [,addJ]=useAtom(addUserJ)
   const {addZ}=getData((state)=>state)

   function addUs(user) {
         addJ(user)
         addZ(user)
         dispatch(addR(user))
   }
   function  handleSubmit(e) {
      e.preventDefault()
      let newUser={
         id:Date.now(),
         name:e.target.name.value,
         age:e.target.age.value,
         job:e.target.job.value
      }
      addUs(newUser)
      setOpen(false)
   }
  return (
    <>
    <Dialog open={open}>
   <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name..."/>
      <input type="text" name="age" placeholder="Age..."/>
      <input type="text" name="job" placeholder="Job..."/>
      <Button type="submit">Add</Button>
      <Button type="button" onClick={()=>setOpen(false)}>Cancel</Button>
   </form>
    </Dialog>
    </>
  )
}
export default AddDialog