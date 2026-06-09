const DB_NAME = 'cloud-document-converter'
const STORE_NAME = 'directory-handles'
const KEY = 'download-directory'

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
  })
}

export const saveDirectoryHandle = async (
  handle: FileSystemDirectoryHandle,
): Promise<void> => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const request = store.put(handle, KEY)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

export const getDirectoryHandle =
  async (): Promise<FileSystemDirectoryHandle | null> => {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const request = store.get(KEY)

      request.onsuccess = () => {
        resolve(request.result ?? null)
      }
      request.onerror = () => reject(request.error)
    })
  }

export const removeDirectoryHandle = async (): Promise<void> => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const request = store.delete(KEY)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

/**
 * 检查文件夹句柄的权限是否已授予
 * 只使用 queryPermission，不使用 requestPermission（后者需要用户手势）
 */
export const checkPermission = async (
  handle: FileSystemDirectoryHandle,
): Promise<boolean> => {
  const options: FileSystemHandlePermissionDescriptor = { mode: 'readwrite' }
  return (await handle.queryPermission(options)) === 'granted'
}
