import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCreateContactMutation, useCreateDebtMutation } from "../../store/api"

export default function AddDebt() {
   const navigate = useNavigate()
   const [createContact, { isLoading: savingContact }] = useCreateContactMutation()
   const [createDebt, { isLoading: savingDebt }] = useCreateDebtMutation()
   const loading = savingContact || savingDebt

   const today = new Date().toISOString().slice(0, 10)

   const [form, setForm] = useState({
      name: "",
      phone: "",
      amount: "",
      direction: "they_owe_me",
      description: "",
      originDate: today,
      dueDate: "",
      status: "pending",
   })
   const [error, setError] = useState("")

   async function save() {
      setError("")

      if (Number(form.amount) <= 0) {
         setError("Amount must be greater than 0")
         return
      }
      if (form.dueDate < form.originDate) {
         setError("Due date cannot be earlier than origination date")
         return
      }

      try {
         const contact = await createContact({
            name: form.name,
            phone: form.phone,
         }).unwrap()

         await createDebt({
            contact_id: contact.id,
            amount: Number(form.amount),
            currency: "USD",
            direction: form.direction,
            description: form.description,
            due_date: form.dueDate,
            status: form.status,
         }).unwrap()

         navigate("/dashboard")
      } catch (err: any) {
         setError(
            err.data?.detail
               ? `${err.data.error}: ${err.data.detail}`
               : err.data?.error || "Something went wrong"
         )
      }
   }

   const inputClass =
      "w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700"
   const labelClass = "mb-1.5 block text-xs font-semibold text-slate-900"
   const hintClass = "mt-1.5 text-[11px] text-slate-600"

   return (
      <>
         <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
            <div className="flex items-center gap-2 text-base">
               <Link
                  to="/dashboard"
                  aria-label="Back"
                  className="text-slate-600 hover:text-slate-900"
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
                     <path d="M19 12H5" />
                     <path d="m12 19-7-7 7-7" />
                  </svg>
               </Link>
               <Link
                  to="/dashboard/debts"
                  className="text-xs text-slate-600 hover:text-slate-900"
               >
                  Debts
               </Link>
               <span className="text-slate-400">/</span>
               <h1 className="font-bold text-slate-900">Add New Debt</h1>
            </div>
            <span className="rounded bg-green-700 px-2 py-1 font-mono text-[10px] font-medium text-white">
               POST /debts
            </span>
         </div>

         <div className="p-6">
            <div className="mx-auto max-w-[680px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
               <div className="flex items-start justify-between gap-3 border-b border-gray-200 bg-slate-50 px-5 py-4">
                  <div>
                     <h2 className="text-sm font-bold text-slate-900">
                        Debt Record Parameters
                     </h2>
                     <p className="mt-1 text-xs text-slate-600">
                        Fill in debtor details, amount and repayment schedule.
                     </p>
                  </div>
                  <span className="font-mono text-[11px] text-slate-600">
                     <span className="text-red-600">*</span> required fields
                  </span>
               </div>

               <form
                  onSubmit={(e) => {
                     e.preventDefault()
                     save()
                  }}
                  className="space-y-5 px-5 py-5"
               >
                  <div className="grid gap-4 sm:grid-cols-2">
                     <div>
                        <label className={labelClass}>
                           Full Name <span className="text-red-600">*</span>
                        </label>
                        <input
                           type="text"
                           required
                           placeholder="e.g. Julian Martinez"
                           value={form.name}
                           onChange={(e) => setForm({ ...form, name: e.target.value })}
                           className={inputClass}
                        />
                        <p className={hintClass}>Official name of the counterparty.</p>
                     </div>
                     <div>
                        <label className={labelClass}>
                           Phone Number <span className="text-red-600">*</span>
                        </label>
                        <input
                           type="tel"
                           required
                           placeholder="+1 (555) 000-0000"
                           value={form.phone}
                           onChange={(e) => setForm({ ...form, phone: e.target.value })}
                           className={inputClass + " font-mono"}
                        />
                        <p className={hintClass}>
                           Primary contact for repayment notifications.
                        </p>
                     </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                     <div>
                        <label className={labelClass}>
                           Amount (USD) <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                           <span className="absolute inset-y-0 left-3 flex items-center font-mono text-xs text-slate-600">
                              $
                           </span>
                           <input
                              type="number"
                              required
                              min="0.01"
                              step="0.01"
                              placeholder="0.00"
                              value={form.amount}
                              onChange={(e) => setForm({ ...form, amount: e.target.value })}
                              className={inputClass + " pl-7 font-mono"}
                           />
                        </div>
                        <p className={hintClass}>Total principal balance owed.</p>
                     </div>

                     <div>
                        <label className={labelClass}>
                           Debt Type <span className="text-red-600">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                           <label
                              className={
                                 "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 " +
                                 (form.direction === "i_owe_them"
                                    ? "border-green-700 bg-green-50"
                                    : "border-gray-300 bg-white")
                              }
                           >
                              <input
                                 type="radio"
                                 name="direction"
                                 checked={form.direction === "i_owe_them"}
                                 onChange={() => setForm({ ...form, direction: "i_owe_them" })}
                                 className="accent-green-700"
                              />
                              <span className="leading-tight">
                                 <span className="block font-mono text-[10px] uppercase text-slate-900">
                                    I owe
                                 </span>
                                 <span className="block text-[11px] text-slate-600">
                                    My liability
                                 </span>
                              </span>
                           </label>

                           <label
                              className={
                                 "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 " +
                                 (form.direction === "they_owe_me"
                                    ? "border-green-700 bg-green-50"
                                    : "border-gray-300 bg-white")
                              }
                           >
                              <input
                                 type="radio"
                                 name="direction"
                                 checked={form.direction === "they_owe_me"}
                                 onChange={() => setForm({ ...form, direction: "they_owe_me" })}
                                 className="accent-green-700"
                              />
                              <span className="leading-tight">
                                 <span className="block font-mono text-[10px] uppercase text-green-700">
                                    Owed to me
                                 </span>
                                 <span className="block text-[11px] text-slate-600">
                                    Receivable asset
                                 </span>
                              </span>
                           </label>
                        </div>
                     </div>
                  </div>

                  <div>
                     <label className={labelClass}>Description</label>
                     <textarea
                        rows={3}
                        placeholder="Detailed reason or itemization (e.g. Freelance design project milestone #2)..."
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className={inputClass + " resize-none"}
                     />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                     <div>
                        <label className={labelClass}>
                           Origination Date <span className="text-red-600">*</span>
                        </label>
                        <input
                           type="date"
                           required
                           value={form.originDate}
                           onChange={(e) => setForm({ ...form, originDate: e.target.value })}
                           className={inputClass}
                        />
                        <p className={hintClass}>Date debt was incurred.</p>
                     </div>
                     <div>
                        <label className={labelClass}>
                           Due Date <span className="text-red-600">*</span>
                        </label>
                        <input
                           type="date"
                           required
                           value={form.dueDate}
                           onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                           className={inputClass}
                        />
                        <p className={hintClass}>Agreed repayment deadline.</p>
                     </div>
                     <div>
                        <label className={labelClass}>
                           Initial Status <span className="text-red-600">*</span>
                        </label>
                        <select
                           value={form.status}
                           onChange={(e) => setForm({ ...form, status: e.target.value })}
                           className={inputClass}
                        >
                           <option value="pending">Pending</option>
                           <option value="partial">Partial</option>
                           <option value="paid">Paid</option>
                        </select>
                        <p className={hintClass}>Lifecycle stage.</p>
                     </div>
                  </div>

                  {error && (
                     <div
                        role="alert"
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
                     >
                        {error}
                     </div>
                  )}

                  <div className="flex justify-end gap-2.5 border-t border-gray-200 pt-4">
                     <Link
                        to="/dashboard"
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-slate-900 transition-colors hover:bg-gray-50"
                     >
                        Cancel
                     </Link>
                     <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-md bg-green-700 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                     >
                        {loading ? "Saving..." : "Save Debt"}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </>
   )
}