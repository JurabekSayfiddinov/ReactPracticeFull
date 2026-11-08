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
    user: {
        id: number;
        name: string;
        description?: string;
    } | null;
};

const EditDialog = ({ open, close, user }: Props) => {
    let { editUser } = useTodo();

    async function handleEdit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!user) return;

        let formData = new FormData(e.currentTarget);

        let updatedUser = {
            id: user.id,
            name: formData.get("name") as string,
            description: formData.get("description") as string
        };

        try {
            await editUser(user.id, updatedUser);
            close();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Edit Todo</DialogTitle>

            <DialogContent>
                <form id="editForm" onSubmit={handleEdit}>
                    <TextField
                        name="name"
                        label="Name"
                        defaultValue={user?.name}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        name="description"
                        label="Description"
                        defaultValue={user?.description}
                        fullWidth
                        margin="normal"
                    />
                </form>
            </DialogContent>

            <DialogActions>
                <Button onClick={close}>Close</Button>

                <Button
                    type="submit"
                    form="editForm"
                    variant="contained"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDialog;