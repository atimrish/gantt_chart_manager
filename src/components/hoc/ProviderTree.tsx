import {ReactNode, useEffect, useState} from "react";
import {getAllTasks, ITaskModel} from "@src/services/indexedDB/models/taskModel";
import {TaskContext} from "@src/context/taskContext";

type ProviderTreeProps = {
    children: ReactNode
}

export const ProviderTree = (p: ProviderTreeProps) => {
    const [tasks, setTasks] = useState<Array<ITaskModel>>([])

    const fetchTasks = async () => {
        const res = await getAllTasks()
        setTasks(res)
    }

    useEffect(() => {
        fetchTasks()
    }, []);

    return (
        <>
            <TaskContext.Provider value={{tasks, setTasks, fetchTasks}}>
                {p.children}
            </TaskContext.Provider>
        </>
    );
};