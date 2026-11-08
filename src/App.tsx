import React, { useEffect, useState } from 'react'
import { useTodo } from './store/store'
import AddDialog from './components/AddDialog';
import EditDialog from './components/EditDialog';

const App = () => {
    const {data,deleteUser,addUser, editUser,getUsers}=useTodo()
      let [addOpen, setAddOpen] = useState(false);
    let [editOpen, setEditOpen] = useState(false);
   
    let [selectedUser, setSelectedUser] = useState<{
        id: number;
        name: string;
        job: string;
    } | null>(null);
    useEffect(()=>{
        getUsers()
    },[])
    const handleAdd=()=>{
    setSelectedUser(null)
    setAddOpen(true)
    }
  return (
    <>
     <button onClick={handleAdd}>
                Add User
            </button>
    {data.map((e)=>(
        <div key={e.id}>
           {e.images?.map((img, index) => (
            <img style={{borderRadius:'50%'}} height="150"
                key={index}
                src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                alt={e.name}
                width="150" 
            />
        ))}
            <h1>{e.name}</h1>
            <p>{e.description}</p>
            <button onClick={()=>deleteUser(e.id)}>Delete</button>
             <button onClick={() => { setSelectedUser(e); setEditOpen(true); }}>
                        Edit
                    </button>
        </div>
        
    ))}
       <AddDialog
    open={addOpen}
    close={() => setAddOpen(false)}
/>

            <EditDialog
                open={editOpen}
                close={() => setEditOpen(false)}
                user={selectedUser}
            />
    </>
  )
}

export default App