import React, {createContext, useContext} from "react";
import {ITaskModel} from "@src/services/indexed-db/models/taskModel";

interface ITaskContext {
    tasks: Array<ITaskModel>
    setTasks: React.Dispatch<React.SetStateAction<Array<ITaskModel>>>;
}

const TaskContext = createContext<ITaskContext>({
    tasks: [],
    setTasks: () => {}
})

const useTaskContext = () => useContext(TaskContext);

export { TaskContext, useTaskContext };
