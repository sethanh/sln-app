enum STORAGE_KEY {
    TOKEN = 'TOKEN',
    LANGUAGE= 'LANGUAGE',
}

export const setToken = (value: string, appName?: string): void => {
    localStorage.setItem(`${appName}_${STORAGE_KEY.TOKEN}`, value);
};  

export const getToken = (appName?: string): string | null => {
    return localStorage.getItem(`${appName}_${STORAGE_KEY.TOKEN}`);
};

export const removeToken = (appName: string): void => {
    localStorage.removeItem(`${appName}_${STORAGE_KEY.TOKEN}`);
};