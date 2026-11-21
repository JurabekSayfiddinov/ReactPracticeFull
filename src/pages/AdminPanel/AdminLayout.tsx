import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom"

const linkClass = ({ isActive }) =>
   "flex items-center gap-3 rounded-md border px-3 py-2 text-sm transition-colors " +
   (isActive
      ? "border-green-200 bg-green-50 font-medium text-green-700"
      : "border-transparent text-slate-700 hover:bg-slate-100")

export default function AdminLayout() {
    const navigate = useNavigate()
  //AGAR TOKEN NABOSHA LOGIN R0ISH MEKNEM
   if (!localStorage.getItem("accessToken")) {
      return <Navigate to="/login" replace />
   }
  
function logout() {
   localStorage.removeItem("accessToken")
   localStorage.removeItem("refreshToken")
   localStorage.removeItem("user")
   navigate("/login")
}

   return (
      <div className="flex min-h-screen bg-slate-50">
  
         <aside className="hidden w-[182px] shrink-0 flex-col border-r border-gray-200 bg-white md:flex">
            <div className="flex items-center gap-2.5 border-b border-gray-200 px-4 py-4">
               <span className="flex h-8 w-8 items-center justify-center rounded-md bg-green-700 text-[11px] font-medium text-white">
                  DF
               </span>
               <span className="flex flex-col leading-tight">
                  <span className="text-[13px] font-bold text-slate-900">
                     DebtFlow
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                     v1.2.0 admin
                  </span>
               </span>
            </div>

            <nav className="flex-1 space-y-1 p-2.5">
             <NavLink to="/dashboard" end className={linkClass}>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className="h-4 w-4"
                     aria-hidden="true"
                  >
                     <rect x="3" y="3" width="7" height="9" rx="1" />
                     <rect x="14" y="3" width="7" height="5" rx="1" />
                     <rect x="14" y="12" width="7" height="9" rx="1" />
                     <rect x="3" y="16" width="7" height="5" rx="1" />
                  </svg>
                  Dashboard
               </NavLink>
       <NavLink to="/dashboard/debts" className={linkClass}>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className="h-4 w-4"
                     aria-hidden="true"
                  >
                     <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                     <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                  </svg>
                  Debts
               </NavLink>
           <NavLink to="/dashboard/folders" className={linkClass}>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className="h-4 w-4"
                     aria-hidden="true"
                  >
                     <rect x="2" y="6" width="20" height="12" rx="2" />
                     <circle cx="12" cy="12" r="2" />
                     <path d="M6 12h.01M18 12h.01" />
                  </svg>
                Folders
               </NavLink>
            </nav>
         <button
   onClick={logout}
   className="mx-2.5 mb-2.5 rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100"
>
   Log out
</button>
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 font-mono text-[10px] text-slate-500">
               <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                  API Online
               </span>
               <span>UTC-8</span>
            </div>
         </aside>

    
         <div className="min-w-0 flex-1">
            <Outlet />
         </div>
      </div>
   )
}