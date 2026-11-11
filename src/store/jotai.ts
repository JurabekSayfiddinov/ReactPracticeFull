import { atom } from "jotai";

type User={
   id:number,
   name:string
}


export const dataAtom=atom([
   {
      id:1,
      name:"Jurabek"
   },
   {
      id:2,
      name:"Lutfullo"
   },
   {
      id:3,
      name:"Farhod"
   }
])


export const deleteUserJ=atom(null,(get,set,id)=>{
   set(dataAtom,get(dataAtom).filter((e)=>e.id!==id))
})

export const addUserJ=atom(null,(get,set,user)=>{
   set(dataAtom,[...get(dataAtom),user])
})

export const editUserJ =atom(null,(get,set,user:User)=>{
    set(dataAtom,get(dataAtom).map((el)=>el.id===user.id?user:el))
})