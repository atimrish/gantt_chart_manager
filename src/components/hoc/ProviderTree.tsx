import {ReactNode, useEffect, useState} from "react";
import {getAllTasks, ITaskModel} from "@src/services/indexed-db/models/taskModel";
import {TaskContext} from "@src/context/taskContext";
import {PopupProvider} from "@src/services/popup-holder/components/PopupProvider";

type ProviderTreeProps = {
    children: ReactNode
}

export const ProviderTree = (p: ProviderTreeProps) => {
    const [tasks, setTasks] = useState<Array<ITaskModel>>([])

    useEffect(() => {
        getAllTasks()
            .then(res => setTasks(res))
    }, []);

    return (
        <>
            <TaskContext.Provider value={{ tasks, setTasks }}>
                <PopupProvider>
                    {p.children}
                </PopupProvider>
            </TaskContext.Provider>
        </>
    );
};