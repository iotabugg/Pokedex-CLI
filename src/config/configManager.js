import fs from "fs"
import path from "path"
import os from "os"
import { defaultConfig } from "./defaults.js"

function getConfigPath() {
    const homeDir = os.homedir()
    const configDir = path.join(homeDir, ".pokedex")
    const configFile = path.join(configDir, "config.json")
    return { configDir, configFile }
}

function ensureConfigExists() {
    const { configDir, configFile } = getConfigPath()

    if(!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, {recursive:true})
    }

    if(!fs.existsSync(configFile)) {
        fs.writeFileSync(
            configFile,
            JSON.stringify(defaultConfig, null, 2),
            "utf-8"
        )
    }
}

export function loadConfig() {
    ensureConfigExists();
    const { configFile } = getConfigPath()
    const raw = fs.readFileSync(configFile, "utf-8")

    let userConfig = {}
    try {
        userConfig = JSON.parse(raw);
    } catch (error) {
        userConfig = {}
    }

    return {
        ...defaultConfig,
        ...userConfig
    }
}