export const StorageService = {
    save,
    load
}

function save(key: string, value: any) {
    const valueJson = JSON.stringify(value);
    localStorage.setItem(key, valueJson);
}

function load(key: string) {
    return localStorage.getItem(key);
}