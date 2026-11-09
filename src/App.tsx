import React, { useEffect, useState } from 'react'
import { deleteUserAtom, getUsersAtom, todoAtom } from './store/store'
import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@mui/material";

const App = () => {
    let data=useAtomValue(todoAtom)
    let getUsers=useSetAtom(getUsersAtom)
    let deleteUser=useSetAtom(deleteUserAtom)
    useEffect(()=>{
      getUsers()
    },[])
  return (
    <>
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
            <Button onClick={()=>deleteUser(e.id)}>Delete</Button>
          
        </div>
        
    ))}
    
    </>
  )
}

export default App