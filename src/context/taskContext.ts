import React, {createContext, useContext} from "react";
import {ITaskModel} from "@src/services/indexedDB/models/taskModel";

interface ITaskContext {
    tasks: Array<ITaskModel>
    setTasks: React.Dispatch<React.SetStateAction<Array<ITaskModel>>>
    fetchTasks: () => void
}

const TaskContext = createContext<ITaskContext>({
    tasks: [],
    setTasks: () => {},
    fetchTasks: () => {}
})

const useTaskContext = () => useContext(TaskContext);

export { TaskContext, useTaskContext };
