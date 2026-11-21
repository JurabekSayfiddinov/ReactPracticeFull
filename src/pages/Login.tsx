import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../store/api"

export default function Login() {
   const navigate = useNavigate()

   const [loginUser, { isLoading: loading }] = useLoginMutation()

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [remember, setRemember] = useState(true)
   const [showPassword, setShowPassword] = useState(false)
   const [error, setError] = useState("")

   async function login() {
      setError("")
      try {
         const data = await loginUser({ email, password }).unwrap()

         localStorage.setItem("accessToken", data.accessToken)
         localStorage.setItem("refreshToken", data.refreshToken)
         localStorage.setItem("user", JSON.stringify(data.user))
         navigate("/dashboard")
      } catch (err: any) {
         if (err.status === 422) setError(err.data?.error || "Validation failed")
         else setError(err.data?.error || "Invalid email or password")
      }
   }

   const inputClass =
      "w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700"

   return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
         <div className="w-full max-w-[420px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
    
            <div className="flex items-start justify-between gap-3 border-b border-gray-200 bg-slate-50 px-5 py-4">
               <div>
                  <h1 className="text-[15px] font-bold text-slate-900">
                     Sign In to DebtFlow
                  </h1>
                  <p className="mt-1 text-xs text-slate-600">
                     Enter your credentials
                  </p>
               </div>
               <span className="shrink-0 rounded bg-green-700 px-2 py-1 font-mono text-[10px] font-medium text-white">
                  POST /auth/login
               </span>
            </div>

            <form
               onSubmit={(e) => {
                  e.preventDefault()
                  login()
               }}
               className="space-y-4 px-5 py-5"
            >
        
               <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-900">
                     Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                     type="email"
                     required
                     placeholder="Email..."
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className={inputClass}
                  />
               </div>

       
               <div>
                  <div className="mb-1.5 flex items-center justify-between">
                     <label className="text-xs font-semibold text-slate-900">
                        Password <span className="text-red-600">*</span>
                     </label>
                     <Link
                        to="/forgot-password"
                        className="font-mono text-[11px] font-medium text-green-700 hover:text-green-800"
                     >
                        Forgot password?
                     </Link>
                  </div>
                  <div className="relative">
                     <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputClass + " pr-10"}
                     />
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-600 hover:text-slate-900"
                     >
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
                           {showPassword ? (
                              <>
                                 <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                 <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                 <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                 <path d="m2 2 20 20" />
                              </>
                           ) : (
                              <>
                                 <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                                 <circle cx="12" cy="12" r="3" />
                              </>
                           )}
                        </svg>
                     </button>
                  </div>
               </div>

           
               <label className="flex items-center gap-2.5 text-xs text-slate-600">
                  <input
                     type="checkbox"
                     checked={remember}
                     onChange={(e) => setRemember(e.target.checked)}
                     className="h-4 w-4 shrink-0 rounded accent-green-700"
                  />
                  Keep me signed in on this device
               </label>

  
               {error && (
                  <div
                     role="alert"
                     className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
                  >
                     {error}
                  </div>
               )}

            
               <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-green-700 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
               >
                  {loading ? "Signing in..." : "Sign In"}
                  {!loading && (
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
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <path d="m10 17 5-5-5-5" />
                        <path d="M15 12H3" />
                     </svg>
                  )}
               </button>
            </form>

        
            <div className="border-t border-gray-200 bg-slate-50 px-5 py-4 text-center text-xs text-slate-600">
               Don't have an account?{" "}
               <Link
                  to="/signup"
                  className="font-bold text-green-700 hover:text-green-800"
               >
                  Register new account
               </Link>
            </div>
         </div>
      </div>
   )
}