import { useAtom, useAtomValue } from "jotai"
import { dataAtom, deleteUserJ } from "./store/jotai"
import { useDispatch, useSelector } from "react-redux"
import { getData } from "./store/zustand"
import { Button, TextField } from "@mui/material"
import { DeleteR } from "./store/CounterSlice"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react"
import AddDialog from "./components/AddDialog"
import DialogEdit from "./components/EditDialog"
const App = () => {
   let dataJ=useAtomValue(dataAtom)
   let [,deleteJ]=useAtom(deleteUserJ)
    const [openAdd,setOpenAdd]=useState(false)
   let dispatch=useDispatch()
   let {data}=useSelector((state)=>state.data)
   let {dataZ,DeleteZ}=getData((state)=>state)
    let [userOpen,setUser] = useState(null)
   let user=data.map((e)=>{
      let Zus=dataZ.find((el)=>el.id==e.id)
      let Jot=dataJ.find((el)=>el.id==e.id)
      return {...e,...Zus,...Jot}
})
   let [search,setSearch]=useState("")
   let fil=user.filter((e)=>e.name.toLowerCase().includes(search.toLowerCase()) )
   function deleteUser(id) {
         deleteJ(id)
         DeleteZ(id)
         dispatch(DeleteR(id))
   }
  return (
    <>
      <TextField label="Search..." variant="outlined" size="small" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <Button onClick={()=>setOpenAdd(true)}>Add User</Button>
      <AddDialog open={openAdd} setOpen={setOpenAdd}/>
        <DialogEdit user={userOpen}  openUser={setUser}/>
      {fil.map((e)=>(
         <div style={{textAlign:'center', width:'200px'}} key={e.id}>
            <img style={{width:'100px', borderRadius:'50%'}} src={e.image} alt="" />
            <h3>{e.name}</h3>
            <p>{e.age}</p>
            <p>{e.job}</p>
           <Button onClick={()=>deleteUser(e.id)} variant="outlined" startIcon={<DeleteIcon/>}>
                         Delete
                           </Button>
                               <Button onClick={()=>setUser(e)}>Edit</Button>
         </div>
      ))}
    </>
  )
}
export default App