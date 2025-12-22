let config = null
export function setConfig(loadedConfig) {
    config = loadedConfig
}

export function getConfig() {
    if(!config) {
        throw new Error("Config has not been initialized")
    }
    return config;
}