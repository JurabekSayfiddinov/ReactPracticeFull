import axios from "axios";
import { atom } from "jotai";
import { Api } from "../utils/Api";

export let todoAtom=atom([])

export let getUsersAtom=atom(null,
   async(get,set)=>{
      try {
         let {data}=await axios.get(Api)
         set(todoAtom,data.data)
      } catch (error) {
        console.log(error);
        
      }
   }
)

export let deleteUserAtom=atom(null,
   async(get,set,id)=>{
      try {
         await axios.delete(`${Api}?id=${id}`)
         set(getUsersAtom)
      } catch (error) {
         console.log(error);
      }
   }
)