import {ReactNode, useEffect, useState} from "react";
import {getAllTasks, ITaskModel} from "@src/services/indexed-db/models/taskModel";
import {TaskContext} from "@src/context/taskContext";

type ProviderTreeProps = {
    children: ReactNode
}

export const ProviderTree = (p: ProviderTreeProps) => {
    const [tasks, setTasks] = useState<Array<ITaskModel>>([])

    const fetchTasks = () => {
        getAllTasks()
            .then(res => setTasks(res))
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