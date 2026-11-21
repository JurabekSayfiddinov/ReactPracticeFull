import { useState } from "react"
import { Link } from "react-router-dom"
import {
   useGetFoldersQuery,
   useCreateFolderMutation,
   useUpdateFolderMutation,
   useDeleteFolderMutation,
   useGetContactsQuery,
   useGetDebtsQuery,
} from "../../store/api"

const PRESET_COLORS = [
   "#15803d", 
   "#ff8800", 
   "#0284c7",
   "#7c3aed", 
   "#dc2626", 
   "#0f172a", 
]

function money(amount: number) {
   return (
      "$" +
      Number(amount || 0).toLocaleString("en-US", {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
      })
   )
}

export default function Folders() {
   const { data, isLoading, error } = useGetFoldersQuery()
   const { data: contactsData } = useGetContactsQuery()
   const { data: debtsData } = useGetDebtsQuery()

   const [createFolder, { isLoading: isCreating }] = useCreateFolderMutation()
   const [updateFolder, { isLoading: isUpdating }] = useUpdateFolderMutation()
   const [deleteFolder, { isLoading: isDeleting }] = useDeleteFolderMutation()

   const [search, setSearch] = useState("")
   const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)

   const [isModalOpen, setIsModalOpen] = useState(false)
   const [editingFolder, setEditingFolder] = useState<any>(null)
   const [name, setName] = useState("")
   const [color, setColor] = useState("#15803d")
   const [formError, setFormError] = useState("")

   const folders = Array.isArray(data)
      ? data
      : data?.folders || data?.items || []

   const contacts = Array.isArray(contactsData)
      ? contactsData
      : contactsData?.contacts || []

   const debts = Array.isArray(debtsData)
      ? debtsData
      : debtsData?.debts || debtsData?.items || []

   const filteredFolders = folders.filter((folder: any) =>
      (folder.name || "").toLowerCase().includes(search.toLowerCase())
   )

   const activeFolder = folders.find((f: any) => f.id === selectedFolderId)
   const activeFolderContacts = activeFolder
      ? contacts.filter((c: any) => c.folder_id === activeFolder.id)
      : []

   function openCreateModal() {
      setEditingFolder(null)
      setName("")
      setColor("#15803d")
      setFormError("")
      setIsModalOpen(true)
   }

   function openEditModal(folder: any, e: React.MouseEvent) {
      e.stopPropagation()
      setEditingFolder(folder)
      setName(folder.name || "")
      setColor(folder.color || "#15803d")
      setFormError("")
      setIsModalOpen(true)
   }

   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      if (!name.trim()) {
         setFormError("Folder name is required")
         return
      }

      try {
         if (editingFolder) {
            await updateFolder({
               id: editingFolder.id,
               name: name.trim(),
               color,
            }).unwrap()
         } else {
            await createFolder({
               name: name.trim(),
               color,
            }).unwrap()
         }
         setIsModalOpen(false)
      } catch (err: any) {
         setFormError(err?.data?.error || "Failed to save folder")
      }
   }

   async function handleDelete(id: string, e: React.MouseEvent) {
      e.stopPropagation()
      if (window.confirm("Delete this folder? Contacts will stay ungrouped.")) {
         try {
            await deleteFolder(id).unwrap()
            if (selectedFolderId === id) {
               setSelectedFolderId(null)
            }
         } catch {
            alert("Failed to delete folder")
         }
      }
   }

   if (isLoading) {
      return <div className="p-6 text-sm text-slate-600">Loading folders...</div>
   }

   if (error) {
      return (
         <div className="p-6">
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
               {(error as any)?.data?.error || "Failed to load folders"}
            </div>
         </div>
      )
   }

   return (
      <>
         <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
            <div className="flex items-center gap-2.5">
               <h1 className="text-base font-bold text-slate-900">
                  Contact Folders
               </h1>
               <span className="rounded border border-gray-200 bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600">
                  {filteredFolders.length} folders
               </span>
            </div>

            <button
               type="button"
               onClick={openCreateModal}
               className="inline-flex items-center gap-2 rounded-md bg-green-700 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-green-800"
            >
               <span className="text-base leading-none">+</span>
               New Folder
            </button>
         </div>

         <div className="space-y-5 p-6">
            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
               <div className="relative min-w-[240px] max-w-md flex-1">
                  <svg
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  >
                     <circle cx="11" cy="11" r="7" />
                     <path d="m20 20-4-4" />
                  </svg>

                  <input
                     type="text"
                     placeholder="Search folders by name..."
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-xs outline-none focus:border-green-700"
                  />
               </div>

               {search && (
                  <button
                     type="button"
                     onClick={() => setSearch("")}
                     className="px-2 py-2 text-xs text-slate-700 hover:text-green-700"
                  >
                     Reset
                  </button>
               )}
            </div>

            {filteredFolders.length === 0 ? (
               <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
                  <p className="text-xs text-slate-500">
                     No folders found. Create a folder to group your contacts.
                  </p>
                  <button
                     type="button"
                     onClick={openCreateModal}
                     className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-green-700 px-3.5 py-2 text-xs font-medium text-white hover:bg-green-800"
                  >
                     + Create First Folder
                  </button>
               </div>
            ) : (
               <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredFolders.map((folder: any) => {
                     const folderContacts = contacts.filter(
                        (c: any) => c.folder_id === folder.id
                     )
                     const contactIds = new Set(
                        folderContacts.map((c: any) => c.id)
                     )
                     const folderDebts = debts.filter((d: any) =>
                        contactIds.has(d.contact_id)
                     )
                     const totalVolume = folderDebts.reduce(
                        (sum: number, d: any) => sum + Number(d.amount || 0),
                        0
                     )

                     const isSelected = selectedFolderId === folder.id
                     const folderColor = folder.color || "#15803d"

                     return (
                        <div
                           key={folder.id}
                           onClick={() =>
                              setSelectedFolderId(
                                 isSelected ? null : folder.id
                              )
                           }
                           className={
                              "cursor-pointer rounded-lg border bg-white p-4 transition-all " +
                              (isSelected
                                 ? "border-green-700 ring-1 ring-green-700"
                                 : "border-gray-200 hover:border-gray-300")
                           }
                        >
                           <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                 <div
                                    className="flex h-9 w-9 items-center justify-center rounded-md text-white"
                                    style={{ backgroundColor: folderColor }}
                                 >
                                    <svg
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       className="h-4 w-4"
                                    >
                                       <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                                    </svg>
                                 </div>

                                 <div>
                                    <h3 className="text-sm font-bold text-slate-900">
                                       {folder.name}
                                    </h3>
                                    <p className="font-mono text-[10px] text-slate-500">
                                       {folderContacts.length} contacts
                                    </p>
                                 </div>
                              </div>

                              <div className="flex items-center gap-1">
                                 <button
                                    type="button"
                                    onClick={(e) => openEditModal(folder, e)}
                                    title="Edit Folder"
                                    className="rounded p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                                 >
                                    <svg
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       className="h-3.5 w-3.5"
                                    >
                                       <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                    </svg>
                                 </button>

                                 <button
                                    type="button"
                                    disabled={isDeleting}
                                    onClick={(e) => handleDelete(folder.id, e)}
                                    title="Delete Folder"
                                    className="rounded p-1.5 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-700 disabled:opacity-40"
                                 >
                                    <svg
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       stroke="currentColor"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       className="h-3.5 w-3.5"
                                    >
                                       <path d="M3 6h18" />
                                       <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                       <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                    </svg>
                                 </button>
                              </div>
                           </div>

                           <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                              <div>
                                 <p className="text-[10px] uppercase tracking-wide text-slate-500">
                                    Total Debts
                                 </p>
                                 <p className="font-mono text-sm font-semibold text-slate-900">
                                    {money(totalVolume)}
                                 </p>
                              </div>

                              <span className="font-mono text-[10px] text-slate-400">
                                 {folder.created_at
                                    ? folder.created_at.slice(0, 10)
                                    : ""}
                              </span>
                           </div>
                        </div>
                     )
                  })}
               </div>
            )}

            {activeFolder && (
               <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                  <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                     <div className="flex items-center gap-2">
                        <span
                           className="h-2.5 w-2.5 rounded-full"
                           style={{
                              backgroundColor: activeFolder.color || "#15803d",
                           }}
                        />
                        <h2 className="text-sm font-bold text-slate-900">
                           Contacts in &ldquo;{activeFolder.name}&rdquo;
                        </h2>
                        <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600">
                           {activeFolderContacts.length}
                        </span>
                     </div>

                     <button
                        type="button"
                        onClick={() => setSelectedFolderId(null)}
                        className="text-xs text-slate-500 hover:text-slate-900"
                     >
                        Close
                     </button>
                  </div>

                  <table className="w-full text-left text-xs">
                     <thead>
                        <tr className="bg-slate-100 text-[10px] font-semibold uppercase tracking-wide text-slate-700">
                           <th className="px-4 py-2.5">Name</th>
                           <th className="px-3 py-2.5">Phone</th>
                           <th className="px-3 py-2.5">Debts Count</th>
                           <th className="px-4 py-2.5 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {activeFolderContacts.length === 0 ? (
                           <tr>
                              <td
                                 colSpan={4}
                                 className="px-4 py-8 text-center text-slate-500"
                              >
                                 No contacts assigned to this folder yet
                              </td>
                           </tr>
                        ) : (
                           activeFolderContacts.map((contact: any) => {
                              const cDebts = debts.filter(
                                 (d: any) => d.contact_id === contact.id
                              )
                              return (
                                 <tr
                                    key={contact.id}
                                    className="border-b border-gray-200 last:border-0 hover:bg-slate-50"
                                 >
                                    <td className="px-4 py-3 font-medium text-slate-900">
                                       {contact.name}
                                    </td>
                                    <td className="px-3 py-3 font-mono text-slate-600">
                                       {contact.phone || "—"}
                                    </td>
                                    <td className="px-3 py-3 font-mono text-slate-700">
                                       {cDebts.length}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                       <Link
                                          to="/dashboard/debts"
                                          className="text-xs font-medium text-green-700 hover:underline"
                                       >
                                          View Debts
                                       </Link>
                                    </td>
                                 </tr>
                              )
                           })
                        )}
                     </tbody>
                  </table>
               </div>
            )}
         </div>

         {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
               <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow-lg">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                     <h2 className="text-sm font-bold text-slate-900">
                        {editingFolder ? "Edit Folder" : "Create New Folder"}
                     </h2>
                     <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="text-slate-400 hover:text-slate-700"
                     >
                        ✕
                     </button>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                     {formError && (
                        <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                           {formError}
                        </div>
                     )}

                     <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                           Folder Name
                        </label>
                        <input
                           type="text"
                           placeholder="e.g. Family, Suppliers, Clients..."
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 text-xs outline-none focus:border-green-700"
                           autoFocus
                        />
                     </div>

                     <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                           Folder Color
                        </label>
                        <div className="mt-2 flex items-center gap-2.5">
                           {PRESET_COLORS.map((preset) => (
                              <button
                                 key={preset}
                                 type="button"
                                 onClick={() => setColor(preset)}
                                 className={
                                    "h-7 w-7 rounded-full border-2 transition-transform " +
                                    (color === preset
                                       ? "scale-110 border-slate-900"
                                       : "border-transparent")
                                 }
                                 style={{ backgroundColor: preset }}
                              />
                           ))}

                           <input
                              type="color"
                              value={color}
                              onChange={(e) => setColor(e.target.value)}
                              className="h-7 w-8 cursor-pointer rounded border border-gray-300 bg-white p-0.5"
                              title="Custom color"
                           />
                        </div>
                     </div>

                     <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-3">
                        <button
                           type="button"
                           onClick={() => setIsModalOpen(false)}
                           className="rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-gray-50"
                        >
                           Cancel
                        </button>
                        <button
                           type="submit"
                           disabled={isCreating || isUpdating}
                           className="rounded-md bg-green-700 px-4 py-2 text-xs font-medium text-white hover:bg-green-800 disabled:opacity-50"
                        >
                           {isCreating || isUpdating
                              ? "Saving..."
                              : editingFolder
                                ? "Save Changes"
                                : "Create Folder"}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </>
   )
}