import { createSlice } from "@reduxjs/toolkit"

export type Users={
   id:number,
   name:string,
   job:string,
}

export type InitialState={
   data:Users[]
}

let initialState:InitialState={
   data:[{
      id:1,
      name:"Abdullo",
      job:"Student"
   },
   {
      id:2,
      name:"Murod",
      job:"Doctor"
   }]
}

 let dataSlice=createSlice({
   name:'data',
   initialState,
   reducers:{
      deleteUser:(state,{payload})=>{
         state.data=state.data.filter((e)=>e.id!=payload)
      },
      addUser:(state,{payload:newUser})=>{
         state.data=[...state.data,newUser]
      },
      editUser:(state,{payload:user})=>{
         state.data=state.data.map((e)=>e.id==user.id?user:e)
      }
   }
})

export const {deleteUser,addUser,editUser} = dataSlice.actions;

export default dataSlice.reducer;