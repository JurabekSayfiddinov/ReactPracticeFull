import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../store/api"

export default function Register() {
   const navigate = useNavigate()
   const [registerUser, { isLoading: loading }] = useRegisterMutation()

   const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      confirm: "",
   })
   const [agree, setAgree] = useState(false)
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirm, setShowConfirm] = useState(false)
   const [error, setError] = useState("")

   async function register() {
      setError("")

      if (form.password.length < 6) {
         setError("Password must contain at least 6 characters")
         return
      }
      if (form.password !== form.confirm) {
         setError("Passwords do not match")
         return
      }
      if (!agree) {
         setError("You must accept the Terms of Service")
         return
      }

      try {
         const data = await registerUser({
            name: form.name,
            email: form.email,
            password: form.password,
         }).unwrap()

         localStorage.setItem("accessToken", data.accessToken)
         localStorage.setItem("refreshToken", data.refreshToken)
         localStorage.setItem("user", JSON.stringify(data.user))
         navigate("/dashboard")
      } catch (err: any) {
         if (err.status === 409) setError("Email already registered")
         else if (err.status === 422)
            setError(err.data?.error || "Validation failed")
         else
            setError(
               err.data?.detail || err.data?.error || "Something went wrong"
            )
      }
   }

   const inputClass =
      "w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700"

   return (
      <div className="flex min-h-screen flex-col bg-slate-50">
         <main className="flex flex-1 items-center justify-center px-4 py-10">
            <div className="w-full max-w-[492px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
               <div className="border-b border-gray-200 bg-slate-50 px-5 py-4">
                  <h1 className="text-[15px] font-bold text-slate-900">
                     Create Your Account
                  </h1>
                  <p className="mt-1 text-xs text-slate-600">
                     Start tracking your debts with DebtFlow
                  </p>
               </div>

               <form
                  onSubmit={(e) => {
                     e.preventDefault()
                     register()
                  }}
                  className="space-y-4 px-5 py-5"
               >
                  <div>
                     <label className="mb-1.5 block text-xs font-semibold text-slate-900">
                        Full Name <span className="text-red-600">*</span>
                     </label>
                     <input
                        type="text"
                        required
                        placeholder="Fullname..."
                        value={form.name}
                        onChange={(e) =>
                           setForm({ ...form, name: e.target.value })
                        }
                        className={inputClass}
                     />
                  </div>

                  <div>
                     <label className="mb-1.5 block text-xs font-semibold text-slate-900">
                        Email Address <span className="text-red-600">*</span>
                     </label>
                     <input
                        type="email"
                        required
                        placeholder="Email..."
                        value={form.email}
                        onChange={(e) =>
                           setForm({ ...form, email: e.target.value })
                        }
                        className={inputClass}
                     />
                     <p className="mt-1.5 text-xs text-slate-600">
                        Used for authentication and settlement notifications.
                     </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                     <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-900">
                           Password <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                           <input
                              type={showPassword ? "text" : "password"}
                              required
                              placeholder="At least 6 characters"
                              value={form.password}
                              onChange={(e) =>
                                 setForm({ ...form, password: e.target.value })
                              }
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

                     <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-900">
                           Confirm Password{" "}
                           <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                           <input
                              type={showConfirm ? "text" : "password"}
                              required
                              placeholder="Re-enter password"
                              value={form.confirm}
                              onChange={(e) =>
                                 setForm({ ...form, confirm: e.target.value })
                              }
                              className={inputClass + " pr-10"}
                           />
                           <button
                              type="button"
                              onClick={() => setShowConfirm(!showConfirm)}
                              aria-label="Toggle confirm password visibility"
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
                                 {showConfirm ? (
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
                  </div>

                  <label className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600">
                     <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-green-700"
                     />
                     <span>
                        I agree to the{" "}
                        <Link
                           to="/terms"
                           className="text-green-700 underline hover:text-green-800"
                        >
                           Terms of Service
                        </Link>{" "}
                        and confirm all recorded debt entries comply with local
                        lending regulations.
                     </span>
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
                     {loading
                        ? "Creating account..."
                        : "Complete Registration & Launch Ledger"}
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
                           <path d="M2 21a8 8 0 0 1 13.292-6" />
                           <circle cx="10" cy="8" r="5" />
                           <path d="m16 19 2 2 4-4" />
                        </svg>
                     )}
                  </button>
               </form>

               <div className="border-t border-gray-200 bg-slate-50 px-5 py-4 text-center text-xs text-slate-600">
                  Already have an account?{" "}
                  <Link
                     to="/login"
                     className="font-bold text-green-700 hover:text-green-800"
                  >
                     Sign In
                  </Link>
               </div>
            </div>
         </main>

         <p className="pb-6 text-center font-mono text-[11px] text-slate-500">
            DebtFlow API Security Layer • Identity Verification Enforced
         </p>
      </div>
   )
}