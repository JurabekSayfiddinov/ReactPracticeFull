
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField
} from '@mui/material'

import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/counterSlice'

const AddDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch()

  async function addNewUser(user) {
    const newUser = {
      fullname: user.fullname,
      age: Number(user.age),
      avatar: user.avatar,
      status: user.status === 'true'
    }

    try {
      await dispatch(addUser(newUser)).unwrap()
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add User</DialogTitle>

      <Formik
        initialValues={{
          fullname: '',
          age: '',
          avatar: '',
          status: 'true'
        }}
        onSubmit={async (values, { resetForm }) => {
          await addNewUser(values)
          resetForm()
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>

              <TextField
                label="Fullname"
                name="fullname"
                value={values.fullname}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Age"
                name="age"
                type="number"
                value={values.age}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Avatar"
                name="avatar"
                value={values.avatar}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />

              <Select
                name="status"
                value={values.status}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="true">Online</MenuItem>
                <MenuItem value="false">Offline</MenuItem>
              </Select>

            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <CircularProgress size={20} color="inherit" />
                )}
                Add
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  )
}

export default AddDialog
