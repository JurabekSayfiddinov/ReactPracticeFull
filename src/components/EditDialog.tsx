import { useEffect, useState } from "react";
import { useTodo } from "../store/store";

type Props = {
    open: boolean;
    close: () => void;
    user: {
        id: number;
        name: string;
        job: string;
    } | null;
};

const EditDialog = ({ open, close, user }: Props) => {
    let { editUser } = useTodo();

    let [name, setName] = useState("");
    let [job, setJob] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name);
            setJob(user.job);
        }
    }, [user]);

    function handleEdit() {
        if (!user || !name || !job) return;

        editUser(user.id, { name, job });
        close();
    }

    if (!open || !user) return null;

    return (
        <div>
            <h2>Edit User</h2>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                value={job}
                onChange={(e) => setJob(e.target.value)}
            />

            <button onClick={handleEdit}>Save</button>
            <button onClick={close}>Close</button>
        </div>
    );
};

export default EditDialog;