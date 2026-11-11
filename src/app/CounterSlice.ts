import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { Api } from "../utils/Api";

export type User={
   id:number,
   fullname:string,
   job:string,
}

export type InitialState={
   data:User[],
   loading:boolean
}


export let getUsers=createAsyncThunk("data/getUsers",async()=>{
   try {
      let {data}=await axios.get(Api)
      return data
   } catch (error) {
      console.log(error)
   }
})

export let addUser=createAsyncThunk("data/addUser",async(user,{dispatch})=>{
   try {
      await axios.post(Api,user)
      dispatch(getUsers())
   } catch (error) {
      console.log(error);
   }
})

export let editUser=createAsyncThunk("data/addUser",async(user,{dispatch})=>{
   try {
      await axios.put(`${Api}/${user.id}`,user)
      dispatch(getUsers())
   } catch (error) {
      console.log(error);
      
   }
})

export let deleteUser=createAsyncThunk("data/deleteUser",async(id,{dispatch})=>{
      try {
         await axios.delete(`${Api}/${id}`)
         dispatch(getUsers())
      } catch (error) {
         console.log(error);
      }
})

let initialState:InitialState={
   data:[],
   loading:false
}

 let dataSlice=createSlice({
   name:'data',
   initialState,
   reducers:{},
   extraReducers:(builder)=>{
      builder.addCase(getUsers.pending,(state)=>{
         state.loading=true
      })
      .addCase(getUsers.fulfilled,(state,action)=>{
         state.loading=false
         state.data=action.payload
      })
      .addCase(addUser.pending,(state)=>{
         state.loading=true
      })
      .addCase(addUser.fulfilled,(state,action)=>{
         state.loading=false
         state.data.push(action.payload)
      })
   }
})

export const {} = dataSlice.actions;

export default dataSlice.reducer;