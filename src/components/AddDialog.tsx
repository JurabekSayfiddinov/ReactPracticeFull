import { useState } from "react";
import { useTodo } from "../store/store";

type Props = {
    open: boolean;
    close: () => void;
};

const AddDialog = ({ open, close }: Props) => {
    let { addUser } = useTodo();

    let [name, setName] = useState("");
    let [job, setJob] = useState("");

    function handleAdd() {
        if (!name || !job) return;

        addUser({ name, job });

        setName("");
        setJob("");
        close();
    }

    if (!open) return null;

    return (
        <div>
            <h2>Add User</h2>

            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                placeholder="Job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
            />

            <button onClick={handleAdd}>Add</button>
            <button onClick={close}>Close</button>
        </div>
    );
};

export default AddDialog;