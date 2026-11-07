import React, { useState } from 'react'
import { useTodo } from './store/store'
import AddDialog from './components/AddDialog';
import EditDialog from './components/EditDialog';

const App = () => {
    const {data,deleteUser,addUser, editUser}=useTodo()
      let [addOpen, setAddOpen] = useState(false);
    let [editOpen, setEditOpen] = useState(false);

    let [selectedUser, setSelectedUser] = useState<{
        id: number;
        name: string;
        job: string;
    } | null>(null);
  return (
    <>
     <button onClick={() => setAddOpen(true)}>
                Add User
            </button>
    {data.map((e)=>(
        <div key={e.id}>
            <h1>{e.name}</h1>
            <p>{e.job}</p>
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