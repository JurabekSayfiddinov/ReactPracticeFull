import type { FormEvent } from "react";
import { useTodo } from "../store/store";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";

type Props = {
    open: boolean;
    close: () => void;
};

const AddDialog = ({ open, close }: Props) => {
    let { addUser } = useTodo();

    async function handleAdd(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        try {
            await addUser(formData);
            close();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Add Todo</DialogTitle>

            <DialogContent>
                <form id="addForm" onSubmit={handleAdd}>
                    <TextField
                        name="Name"
                        label="Name"
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        name="Description"
                        label="Description"
                        fullWidth
                        margin="normal"
                    />

                    <input
                        type="file"
                        name="Images"
                        multiple
                        accept="image/*"
                    />
                </form>
            </DialogContent>

            <DialogActions>
                <Button onClick={close}>Close</Button>

                <Button
                    type="submit"
                    form="addForm"
                    variant="contained"
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddDialog;