import { Link } from "react-router-dom"

export default function Footer() {
   return (
      <footer className="w-full bg-white">
         <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
            <p className="text-xs text-slate-600">
               <span className="mr-2 font-bold text-slate-900">DebtFlow</span>
               &copy; 2026 DebtFlow Systems Inc. All rights reserved.
            </p>

            <nav className="flex items-center gap-5 font-mono text-xs text-slate-600">
               <Link
                  to="/login"
                  className="transition-colors hover:text-slate-900"
               >
                  Login
               </Link>
               <Link
                  to="/signup"
                  className="transition-colors hover:text-slate-900"
               >
                  Register
               </Link>
             
            </nav>
         </div>
      </footer>
   )
}