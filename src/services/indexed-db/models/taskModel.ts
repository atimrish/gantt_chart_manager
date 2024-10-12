import {getIDBConnection} from "@src/services/indexed-db/indexed-db-service";

const MODEL_NAME = 'tasks'

interface ITaskModel {
    id?: IDBValidKey;
    title: string;
    description: string;
    createdAt: Date;
    start: Date;
    end: Date;
    completed: boolean;
}

const getAllTasks = async () => {
    const connection = await getIDBConnection()
    const transaction = connection.transaction(MODEL_NAME, 'readonly')
    const request: IDBRequest<Array<ITaskModel>> = transaction.objectStore(MODEL_NAME).getAll()
    const tasks: Array<ITaskModel> = await new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })

    transaction.db.close()
    return tasks
}

const createTask = async (data: ITaskModel) => {
    const connection = await getIDBConnection()
    const transaction = connection.transaction(MODEL_NAME, 'readwrite')
    const request = transaction.objectStore(MODEL_NAME).add(data)

    const response:IDBValidKey = await new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })

    connection.close()
    return response
}

const updateTask = async (data: ITaskModel) => {
    const connection = await getIDBConnection()
    const transaction = connection.transaction(MODEL_NAME, 'readwrite')
    const request = transaction.objectStore(MODEL_NAME).put(data)
    const response:IDBValidKey = await new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })

    connection.close()
    return response
}

export { ITaskModel, getAllTasks, createTask, updateTask }


