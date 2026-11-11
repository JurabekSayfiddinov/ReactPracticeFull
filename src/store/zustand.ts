import { create } from "zustand";

export const getData=create((set)=>({
   dataZ:[
      {
         id:1,
         age:20,
         image:'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
      },
      {
         id:2,
         age:17,
         image:'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
      },
      {
         id:3,
         age:26,
         image:'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
      }
   ],
   DeleteZ:(id)=>set((state)=>({
      dataZ:state.dataZ.filter((e)=>e.id!==id)
   })),
    addZ: (user) =>set((state)=>({
   dataZ : [...state.dataZ, user]
  })),
     EditZ: (user) =>set((state)=>({
   dataZ : state.dataZ.map((el)=>el.id===user.id?user:el)
  })),
}))