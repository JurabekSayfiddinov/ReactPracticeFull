import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/counterSlice'


const AddDialog = ({open,setOpen}) => {
    let dispatch=useDispatch()
    let {
        register,
        handleSubmit,
        reset,
        formState:{isSubmitting}
    }=useForm()

    async function  addNewUser(user) {
        let newUser={
            fullname:user.fullname,
            age:user.age,
            avatar:user.avatar,
            status:user.status==='true'
        }
        try {
            await dispatch(addUser(newUser))
            reset()
            setOpen(false)
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <>
        <Dialog open={open} onClose={()=>setOpen(false)}>
            <DialogTitle>Add User</DialogTitle>
            <form onSubmit={handleSubmit(addNewUser)}>
                <DialogContent>
                      <TextField
            label="Fullname"
            {...register("fullname", { required: true })}
          />

          <TextField
            label="Age"
            type="number"
            {...register("age")}
          />

          <TextField
            label="Avatar"
            {...register("avatar")}
          />

          <Select {...register("status")}>
            <MenuItem value="true">Online</MenuItem>
            <MenuItem value="false">Offline</MenuItem>
          </Select>
                </DialogContent>
                 <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <CircularProgress size={20} color="inherit" />
            )}
            Add
          </Button>
        </DialogActions>
            </form>
        </Dialog>
    </>
  )
}

export default AddDialog