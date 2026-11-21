import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Register from "./pages/Register"
import AdminLayout from "./pages/AdminPanel/AdminLayout"
import Dashboard from "./pages/AdminPanel/Dashboard"
import Login from "./pages/Login"
import AddDebt from "./pages/AdminPanel/AddDebt"
import Debts from "./pages/AdminPanel/Debts"
import DebtDetails from "./pages/AdminPanel/DebtsDetails"
import Folders from "./pages/AdminPanel/Folders"

const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [{ index: true, element: <Home /> }],
   },
   {
      path: "signup",
      element: <Register />,
   },
   {
      path: "login",
      element: <Login/>,
   },
   {
      path: "dashboard",
      element: <AdminLayout />,
      children: [
         { 
            index: true, 
            element: <Dashboard /> 
         },
          {
             path: "debts/new", 
             element: <AddDebt />
             },
            {
               path:"debts",
               element: <Debts/>
            },
            {
               path:"folders",
               element: <Folders/>
            },
            {
               path:"/dashboard/debts/:id",
                 element: <DebtDetails />
            }
         ],

   },
   {
      path: "*",
      element: <div className="p-6">404 — Page not found</div>,
   },
])

export default function App() {
   return <RouterProvider router={router} />
}