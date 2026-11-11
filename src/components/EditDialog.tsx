import { useAtom } from "jotai"


import { useDispatch } from "react-redux"
import { editR } from "../store/CounterSlice"
import { Button, Dialog } from "@mui/material"
import { editUserJ } from "../store/jotai"
import { getData } from "../store/zustand"


export default function DialogEdit({ user, openUser }) {
  const dispatch = useDispatch()
  const [, EditJ] = useAtom(editUserJ)
  const { EditZ } = getData((state) => state)

 

  function EditUss(obj) {
    EditJ(obj)
    EditZ(obj)
    dispatch(editR(obj))
  }

  function edit(e) {
    e.preventDefault()
    const editobj = {
      id: user.id,
      name: e.target.name.value,
      age: e.target.age.value,
      job:e.target.job.value
    }
    EditUss(editobj)
    openUser(null)
  }

  return (
    <Dialog open={user}>
  
      <form onSubmit={edit} >
        <input defaultValue={user?.name} type="text" name="name" id="" />
        <input defaultValue={user?.age} type="text" name="age" id="" />
        <input defaultValue={user?.job} type="text" name="job" id="" />
        <Button type="submit">save</Button>
        <Button onClick={() => openUser(null)} type="button">
          cancel
        </Button>
      </form> 
    </Dialog>
  )
}