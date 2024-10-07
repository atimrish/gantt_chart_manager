const DB_SERVICE_NAME = 'tasks';

const getIDBConnection: () => Promise<IDBDatabase> = () => new Promise((resolve, reject) => {
    const IDB = window.indexedDB.open(DB_SERVICE_NAME, 1)

    IDB.onupgradeneeded = () => {
        if (IDB.result.objectStoreNames.contains(DB_SERVICE_NAME)) {
            return
        }

        IDB.result.createObjectStore(DB_SERVICE_NAME, {
            keyPath: 'id',
            autoIncrement: true
        })
    }


    IDB.onsuccess = () => {
        resolve(IDB.result)
    }

    IDB.onerror = reject
})

export { getIDBConnection }

///TODO: реализовать контекст для indexedDB и моделей (диаграммы, задачи)
